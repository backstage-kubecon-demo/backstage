export const createDashboard = (k8sName: string, dashboardName: string) => ({
  annotations: {
    list: [
      {
        builtIn: 1,
        datasource: '-- Grafana --',
        enable: true,
        hide: true,
        iconColor: 'rgba(0, 211, 255, 1)',
        name: 'Annotations & Alerts',
        target: {
          limit: 100,
          matchAny: false,
          tags: [],
          type: 'dashboard',
        },
        type: 'dashboard',
      },
    ],
  },
  editable: true,
  fiscalYearStartMonth: 0,
  graphTooltip: 0,
  links: [],
  liveNow: false,
  panels: [
    {
      gridPos: {
        h: 7,
        w: 24,
        x: 0,
        y: 0,
      },
      id: 6,
      options: {
        alertInstanceLabelFilter: '',
        alertName: '',
        dashboardAlerts: false,
        datasource: '-- Grafana --',
        folder: {
          id: 2,
          title: 'Grafana',
        },
        groupBy: [],
        groupMode: 'default',
        maxItems: 20,
        sortOrder: 1,
        stateFilter: {
          error: true,
          firing: true,
          inactive: true,
          noData: true,
          normal: true,
          pending: true,
        },
      },
      title: 'Alerts',
      type: 'alertlist',
    },
    {
      fieldConfig: {
        defaults: {
          color: {
            mode: 'palette-classic',
          },
          custom: {
            axisLabel: '',
            axisPlacement: 'auto',
            barAlignment: 0,
            drawStyle: 'line',
            fillOpacity: 0,
            gradientMode: 'none',
            hideFrom: {
              legend: false,
              tooltip: false,
              viz: false,
            },
            lineInterpolation: 'linear',
            lineWidth: 1,
            pointSize: 5,
            scaleDistribution: {
              type: 'linear',
            },
            showPoints: 'auto',
            spanNulls: false,
            stacking: {
              group: 'A',
              mode: 'none',
            },
            thresholdsStyle: {
              mode: 'off',
            },
          },
          mappings: [],
          thresholds: {
            mode: 'absolute',
            steps: [
              {
                color: 'green',
                value: null,
              },
              {
                color: 'red',
                value: 80,
              },
            ],
          },
        },
        overrides: [],
      },
      gridPos: {
        h: 8,
        w: 24,
        x: 0,
        y: 7,
      },
      id: 2,
      options: {
        legend: {
          calcs: [],
          displayMode: 'list',
          placement: 'bottom',
        },
        tooltip: {
          mode: 'single',
          sort: 'none',
        },
      },
      pluginVersion: '8.4.4',
      targets: [
        {
          datasource: {
            type: 'stackdriver',
            uid: 'g02oEzunk',
          },
          metricQuery: {
            aliasBy: '{{metadata.system_labels.name}}',
            alignmentPeriod: 'grafana-auto',
            crossSeriesReducer: 'REDUCE_MEAN',
            editorMode: 'visual',
            filters: [
              'resource.label.namespace_name',
              '=',
              'default',
              'AND',
              'metadata.system_labels.name',
              '=',
              k8sName,
            ],
            groupBys: ['metadata.system_labels.name'],
            metricKind: 'CUMULATIVE',
            metricType: 'kubernetes.io/container/cpu/core_usage_time',
            perSeriesAligner: 'ALIGN_INTERPOLATE',
            preprocessor: 'rate',
            projectName: 'gentle-waters-350012',
            query: '',
            valueType: 'DOUBLE',
          },
          queryType: 'metrics',
          refId: 'Thing',
        },
      ],
      title: 'CPU Usage',
      transformations: [],
      type: 'timeseries',
    },
    {
      fieldConfig: {
        defaults: {
          color: {
            mode: 'palette-classic',
          },
          custom: {
            axisLabel: '',
            axisPlacement: 'auto',
            barAlignment: 0,
            drawStyle: 'line',
            fillOpacity: 0,
            gradientMode: 'none',
            hideFrom: {
              legend: false,
              tooltip: false,
              viz: false,
            },
            lineInterpolation: 'linear',
            lineWidth: 1,
            pointSize: 5,
            scaleDistribution: {
              type: 'linear',
            },
            showPoints: 'auto',
            spanNulls: false,
            stacking: {
              group: 'A',
              mode: 'none',
            },
            thresholdsStyle: {
              mode: 'line',
            },
          },
          mappings: [],
          thresholds: {
            mode: 'absolute',
            steps: [
              {
                color: 'green',
                value: null,
              },
              {
                color: 'red',
                value: 0,
              },
            ],
          },
        },
        overrides: [],
      },
      gridPos: {
        h: 8,
        w: 12,
        x: 0,
        y: 15,
      },
      id: 4,
      options: {
        legend: {
          calcs: [],
          displayMode: 'list',
          placement: 'bottom',
        },
        tooltip: {
          mode: 'single',
          sort: 'none',
        },
      },
      targets: [
        {
          datasource: {
            type: 'stackdriver',
            uid: 'g02oEzunk',
          },
          metricQuery: {
            aliasBy: '{{metadata.system_labels.name}}',
            alignmentPeriod: 'cloud-monitoring-auto',
            crossSeriesReducer: 'REDUCE_COUNT',
            editorMode: 'visual',
            filters: ['resource.label.container_name', '=', k8sName],
            groupBys: ['metadata.system_labels.name'],
            metricKind: 'GAUGE',
            metricType: 'kubernetes.io/container/uptime',
            perSeriesAligner: 'ALIGN_MEAN',
            preprocessor: 'none',
            projectName: 'gentle-waters-350012',
            query: '',
            valueType: 'DOUBLE',
          },
          queryType: 'metrics',
          refId: 'A',
        },
      ],
      title: 'Running Instances',
      type: 'timeseries',
    },
  ],
  refresh: '',
  schemaVersion: 35,
  style: 'dark',
  tags: [],
  templating: {
    list: [],
  },
  time: {
    from: 'now-6h',
    to: 'now',
  },
  timepicker: {},
  timezone: '',
  title: dashboardName,
  id: null,
  uid: null,
  version: 0,
  weekStart: '',
});
