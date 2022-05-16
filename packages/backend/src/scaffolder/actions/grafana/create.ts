import { Config } from '@backstage/config';
import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import fetch from 'cross-fetch';
import { createDashboard } from './sampleDashboard';

export const createGrafanaDashboardAction = (config: Config) =>
  createTemplateAction<{
    folderName: string;
    k8sDeploymentName: string;
  }>({
    id: 'grafana:dashboard:create',
    schema: {
      input: {
        type: 'object',
        properties: {
          folderName: {
            type: 'string',
            description: 'The name for the folder of the dashboard',
          },
          k8sDeploymentName: {
            type: 'string',
            description: 'The deployment name in K8s',
          },
        },
      },
      output: {
        type: 'object',
        properties: {
          dashboardUrl: {
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      ctx.logger.info('Creating template in Grafana');

      const grafanaHost = config.getString('grafana.host');
      const grafanaToken = config.getString('grafana.token');

      const folder: any = await fetch(`http://${grafanaHost}/api/folders`, {
        body: JSON.stringify({
          title: ctx.input.folderName,
        }),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${grafanaToken}`,
          'Content-Type': 'application/json',
        },
      }).then(r => r.json());

      const dashboard: any = await fetch(
        `http://${grafanaHost}/api/dashboards/db`,
        {
          body: JSON.stringify({
            dashboard: createDashboard(
              ctx.input.k8sDeploymentName,
              `${ctx.input.k8sDeploymentName} Service Dashboard`,
            ),
            folderUid: folder.uid,
            message: 'Created dashboard',
          }),
          method: 'POST',
          headers: {
            Authorization: `Bearer ${grafanaToken}`,
            'Content-Type': 'application/json',
          },
        },
      ).then(r => r.json());

      ctx.output('dashboardUrl', `http://${grafanaHost}${dashboard.url}`);
    },
  });
