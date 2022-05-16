import { CatalogClient } from '@backstage/catalog-client';
import {
  createRouter,
  createBuiltinActions,
} from '@backstage/plugin-scaffolder-backend';
import { createGrafanaDashboardAction } from '../scaffolder/actions/grafana/create';
import { Router } from 'express';
import { ScmIntegrations } from '@backstage/integration';
import type { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });

  const integrations = ScmIntegrations.fromConfig(env.config);

  const actions = [
    createGrafanaDashboardAction(env.config),
    ...createBuiltinActions({
      catalogClient,
      config: env.config,
      reader: env.reader,
      integrations,
    }),
  ];

  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    actions,
  });
}
