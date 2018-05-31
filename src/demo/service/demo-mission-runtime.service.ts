import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { MissionRuntimeService, Cluster } from '../../app/launcher/launcher.module';
import { Mission } from '../../app/launcher/launcher.module';
import { Runtime } from '../../app/launcher/launcher.module';

import { HelperService } from '../../app/launcher/service/helper.service';
import { TokenProvider } from '../../app/service/token-provider';

@Injectable()
export class DemoMissionRuntimeService implements MissionRuntimeService {

  getMissions(): Observable<Mission[]> {
    let missions = Observable.of([
      {
        "id": "crud",
        "name": "CRUD",
        "description": "Expand on the REST API Level 0 to perform CRUD operations on a PostgreSQL database using a simple HTTP REST API",
        "metadata": {
          "level": "foundational"
        },
        "runtimes": [
          "vert.x",
          "nodejs",
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "cache",
        "name": "Cache",
        "description": "Use a cache to improve the response time of applications",
        "metadata": {
          "level": "advanced"
        },
        "runtimes": [
          "vert.x",
          "nodejs",
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "circuit-breaker",
        "name": "Circuit Breaker",
        "description": "Report the failure of a service and then limit access to the failed service until it becomes available to handle requests",
        "metadata": {
          "level": "foundational"
        },
        "runtimes": [
          "vert.x",
          "fuse",
          "nodejs",
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "configmap",
        "name": "Externalized Configuration",
        "description": "Use a ConfigMap to externalize configuration. ConfigMap is an object used by OpenShift to inject configuration data as simple key and value pairs into one or more Linux containers while keeping the containers independent of OpenShift",
        "metadata": {
          "level": "foundational"
        },
        "runtimes": [
          "vert.x",
          "fuse",
          "nodejs",
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "health-check",
        "name": "Health Check",
        "description": "Monitor an application's ability to service requests",
        "metadata": {
          "level": "foundational"
        },
        "runtimes": [
          "vert.x",
          "fuse",
          "nodejs",
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "istio-circuit-breaker",
        "name": "Istio - Circuit Breaker",
        "description": "The Istio Circuit Breaker mission demonstrates limiting access to a degraded service until it becomes available to handle requests. This helps prevent cascading failures in other services that depend on the failed services for functionality.",
        "metadata": {
          "level": "expert",
          "istio": true
        },
        "runtimes": [
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "istio-distributed-tracing",
        "name": "Istio - Distributed Tracing",
        "description": "The Istio Distributed Tracing mission demonstrates how simple distributed tracing can be integrated with an application running on an Istio-enabled cluster.",
        "metadata": {
          "level": "expert",
          "istio": true
        },
        "runtimes": [
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "istio-routing",
        "name": "Istio - Routing",
        "description": "The Istio Routing mission demonstrates how Istio can be used to route traffic to/from services, including load balancing traffic to different versions of the same service. This can be used to set up A/B tests, canary deployments, or simply do rolling deployments during a production release.",
        "metadata": {
          "level": "expert",
          "istio": true
        },
        "runtimes": [
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "istio-security",
        "name": "Istio - Security",
        "description": "Ths Istio Security mission demonstrates how Istio secures communication between microservices with Mutual TLS, and how services can be allowed or denied access to other services using ACL.",
        "metadata": {
          "level": "expert",
          "istio": true
        },
        "runtimes": [
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "rest-http",
        "name": "REST API Level 0",
        "description": "Map business operations to a remote procedure call endpoint over HTTP using a REST framework",
        "metadata": {
          "level": "foundational"
        },
        "runtimes": [
          "vert.x",
          "fuse",
          "nodejs",
          "spring-boot",
          "wildfly-swarm"
        ]
      },
      {
        "id": "rest-http-secured",
        "name": "Secured",
        "description": "Expands on REST API Level 0 to secure the REST endpoint using Red Hat SSO which adds security to your applications while centralizing the security configuration",
        "metadata": {
          "level": "advanced"
        },
        "runtimes": [
          "vert.x",
          "nodejs",
          "spring-boot",
          "wildfly-swarm"
        ]
      }
    ] as Mission[]);
    return missions;
  }

  getRuntimes(): Observable<Runtime[]> {
    let runtimes = Observable.of([
      {
        "id": "vert.x",
        "name": "Eclipse Vert.x",
        "icon": "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 280'%3E%3Cpath fill='%23022B37' d='M107 170.8L67.7 72H46.9L100 204h13.9L167 72h-20.4zm64 33.2h80v-20h-61v-37h60v-19h-60V91h61V72h-80zm180.1-90.7c0-21-14.4-42.3-43.1-42.3h-48v133h19V91h29.1c16.1 0 24 11.1 24 22.4 0 11.5-7.9 22.6-24 22.6H286v9.6l48 58.4h24.7L317 154c22.6-4 34.1-22 34.1-40.7m56.4 90.7v-1c0-6 1.7-11.7 4.5-16.6V91h39V71h-99v20h41v113h14.5z'/%3E%3Cpath fill='%23623C94' d='M458 203c0-9.9-8.1-18-18-18s-18 8.1-18 18 8.1 18 18 18 18-8.1 18-18M577.4 72h-23.2l-27.5 37.8L499.1 72h-40.4c12.1 16 33.6 46.8 47.8 66.3l-37 50.9c2 4.2 3.1 8.9 3.1 13.8v1H499l95.2-132h-16.8zm-19.7 81.5l-20.1 27.9 16.5 22.6h40.2c-9.6-13.7-24-33.3-36.6-50.5z'/%3E%3C/svg%3E",
        "description": "A tool-kit for building reactive applications on the JVM.",
        "metadata": {
          "pipelinePlatform": "maven"
        },
        "missions": [
          {
            "id": "crud",
            "versions": [
              {
                "id": "community",
                "name": "3.5.0.Final (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "3.5.1.redhat-003 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {
                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "cache",
            "versions": [
              {
                "id": "community",
                "name": "3.5.0.Final (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "3.5.1.redhat-003 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                    "runsOn": [
                      "!starter",
                      "!osio"
                    ]}}
                  }
                }
              }
            ]
          },
          {
            "id": "circuit-breaker",
            "versions": [
              {
                "id": "community",
                "name": "3.5.0.Final (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {
                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "3.5.1.redhat-003 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {
                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "configmap",
            "versions": [
              {
                "id": "community",
                "name": "3.5.0.Final (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {
                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "3.5.1.redhat-003 (RHOAR)",
                "booster": {}
              }
            ]
          },
          {
            "id": "health-check",
            "versions": [
              {
                "id": "community",
                "name": "3.5.0.Final (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {
                        "runsOn": [
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "3.5.1.redhat-003 (RHOAR)",
                "booster": {}
              }
            ]
          },
          {
            "id": "rest-http",
            "versions": [
              {
                "id": "community",
                "name": "3.5.0.Final (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "3.5.1.redhat-003 (RHOAR)",
                "booster": {}
              }
            ]
          },
          {
            "id": "rest-http-secured",
            "versions": [
              {
                "id": "community",
                "name": "3.5.0.Final (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "3.5.1.redhat-003 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "id": "fuse",
        "name": "Fuse",
        "icon": "data:image/svg+xml;charset=utf8,%3Csvg%20version%3D%221.1%22%20id%3D%22logo%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%20193.84%20103.23%22%20style%3D%22enable-background%3Anew%200%200%20193.84%20103.23%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cg%3E%0A%09%3Cpath%20d%3D%22M34.85%2C41.85l-2.74-5.66h-1.88v5.66h-4.56v-16.8h7.51c0.98%2C0%2C1.87%2C0.1%2C2.68%2C0.3c0.81%2C0.2%2C1.5%2C0.52%2C2.08%2C0.95%0A%09%09c0.58%2C0.43%2C1.02%2C1%2C1.33%2C1.69c0.31%2C0.7%2C0.47%2C1.54%2C0.47%2C2.53c0%2C1.26-0.27%2C2.3-0.82%2C3.1c-0.55%2C0.8-1.28%2C1.41-2.21%2C1.82l3.37%2C6.41%0A%09%09H34.85z%20M34.63%2C29.35c-0.31-0.34-0.84-0.5-1.58-0.5h-2.82v3.67h2.75c0.77%2C0%2C1.32-0.16%2C1.64-0.48c0.32-0.32%2C0.48-0.78%2C0.48-1.39%0A%09%09C35.1%2C30.11%2C34.94%2C29.68%2C34.63%2C29.35z%22/%3E%0A%09%3Cpath%20d%3D%22M43.57%2C41.85v-16.8h12.86v3.91h-8.26v2.26h4.97v3.84h-4.97v2.88h8.42v3.91H43.57z%22/%3E%0A%09%3Cpath%20d%3D%22M74.24%2C37.35c-0.38%2C1.08-0.96%2C1.95-1.73%2C2.62s-1.72%2C1.14-2.84%2C1.44s-2.44%2C0.44-3.92%2C0.44H60.3v-16.8h5.88%0A%09%09c1.31%2C0%2C2.5%2C0.14%2C3.58%2C0.41c1.07%2C0.27%2C1.98%2C0.73%2C2.72%2C1.38c0.74%2C0.65%2C1.32%2C1.5%2C1.73%2C2.56c0.41%2C1.06%2C0.61%2C2.38%2C0.61%2C3.96%0A%09%09S74.63%2C36.27%2C74.24%2C37.35z%20M69.84%2C31.43c-0.14-0.56-0.36-1.02-0.66-1.37c-0.3-0.35-0.7-0.61-1.2-0.78s-1.1-0.25-1.82-0.25H65v8.83%0A%09%09h1.01c0.72%2C0%2C1.34-0.08%2C1.85-0.23c0.51-0.15%2C0.93-0.4%2C1.26-0.74c0.33-0.34%2C0.56-0.8%2C0.71-1.37c0.14-0.57%2C0.22-1.27%2C0.22-2.1%0A%09%09C70.04%2C32.66%2C69.97%2C31.99%2C69.84%2C31.43z%22/%3E%0A%09%3Cpath%20d%3D%22M96.97%2C41.85v-6.62h-5.23v6.62h-4.75v-16.8h4.75v6.12h5.23v-6.12h4.75v16.8H96.97z%22/%3E%0A%09%3Cpath%20d%3D%22M116.7%2C41.85l-0.91-2.95h-5.04l-0.91%2C2.95h-4.99l6.1-16.8h4.7l6.1%2C16.8H116.7z%20M114.35%2C34.1%0A%09%09c-0.14-0.54-0.27-1.02-0.38-1.42c-0.11-0.4-0.21-0.76-0.3-1.08c-0.09-0.32-0.16-0.61-0.23-0.88c-0.06-0.26-0.12-0.54-0.17-0.83%0A%09%09c-0.05%2C0.29-0.1%2C0.57-0.17%2C0.84c-0.06%2C0.27-0.14%2C0.57-0.23%2C0.89c-0.09%2C0.32-0.19%2C0.68-0.3%2C1.08c-0.11%2C0.4-0.24%2C0.86-0.38%2C1.39%0A%09%09l-0.31%2C1.1h2.78L114.35%2C34.1z%22/%3E%0A%09%3Cpath%20d%3D%22M131.24%2C29.11v12.74h-4.66V29.11h-4.7v-4.06h14.06v4.06H131.24z%22/%3E%0A%09%3Cpath%20d%3D%22M142.18%2C27.96c-0.11%2C0.26-0.26%2C0.49-0.46%2C0.69c-0.19%2C0.19-0.42%2C0.35-0.69%2C0.46c-0.26%2C0.11-0.55%2C0.17-0.86%2C0.17%0A%09%09c-0.31%2C0-0.59-0.06-0.86-0.17c-0.26-0.11-0.49-0.26-0.69-0.46c-0.19-0.19-0.35-0.42-0.46-0.69c-0.11-0.26-0.17-0.55-0.17-0.86%0A%09%09s0.05-0.59%2C0.17-0.86s0.26-0.49%2C0.46-0.69s0.42-0.35%2C0.69-0.46c0.26-0.11%2C0.55-0.17%2C0.86-0.17c0.31%2C0%2C0.59%2C0.06%2C0.86%2C0.17%0A%09%09c0.26%2C0.11%2C0.49%2C0.26%2C0.69%2C0.46c0.19%2C0.19%2C0.35%2C0.42%2C0.46%2C0.69c0.11%2C0.26%2C0.17%2C0.55%2C0.17%2C0.86S142.29%2C27.69%2C142.18%2C27.96z%0A%09%09%20M141.86%2C26.38c-0.09-0.22-0.22-0.42-0.38-0.58s-0.36-0.29-0.58-0.38c-0.22-0.09-0.46-0.14-0.72-0.14c-0.26%2C0-0.5%2C0.05-0.72%2C0.14%0A%09%09c-0.22%2C0.09-0.41%2C0.22-0.58%2C0.38s-0.29%2C0.36-0.38%2C0.58c-0.09%2C0.22-0.14%2C0.46-0.14%2C0.72c0%2C0.26%2C0.05%2C0.5%2C0.14%2C0.72%0A%09%09c0.09%2C0.22%2C0.22%2C0.41%2C0.38%2C0.58c0.16%2C0.16%2C0.36%2C0.29%2C0.58%2C0.38c0.22%2C0.09%2C0.46%2C0.14%2C0.72%2C0.14c0.26%2C0%2C0.5-0.05%2C0.72-0.14%0A%09%09c0.22-0.09%2C0.42-0.22%2C0.58-0.38c0.16-0.16%2C0.29-0.36%2C0.38-0.58c0.09-0.22%2C0.14-0.46%2C0.14-0.72C142%2C26.84%2C141.95%2C26.6%2C141.86%2C26.38z%0A%09%09%20M141.03%2C27.05c-0.09%2C0.12-0.21%2C0.2-0.37%2C0.24l0.49%2C0.95h-0.47l-0.46-0.91h-0.45v0.91h-0.4v-2.36h1.04c0.1%2C0%2C0.2%2C0.01%2C0.3%2C0.04%0A%09%09c0.09%2C0.03%2C0.18%2C0.07%2C0.25%2C0.13s0.13%2C0.13%2C0.17%2C0.22c0.04%2C0.09%2C0.06%2C0.2%2C0.06%2C0.32C141.17%2C26.78%2C141.12%2C26.93%2C141.03%2C27.05z%0A%09%09%20M140.66%2C26.35c-0.07-0.06-0.16-0.08-0.27-0.08h-0.62v0.67h0.62c0.11%2C0%2C0.2-0.03%2C0.27-0.08c0.07-0.05%2C0.11-0.14%2C0.11-0.26%0A%09%09C140.76%2C26.49%2C140.73%2C26.41%2C140.66%2C26.35z%22/%3E%0A%09%3Cpath%20d%3D%22M28.47%2C49.21v8.35h6.91v2.56h-6.91v11.74h-2.81v-25.2h14.8v2.56H28.47z%22/%3E%0A%09%3Cpath%20d%3D%22M61.13%2C69.53c-1.49%2C1.81-3.76%2C2.72-6.8%2C2.72c-3.02%2C0-5.3-0.89-6.82-2.68c-1.52-1.79-2.29-4.43-2.29-7.94V46.65h2.81v14.9%0A%09%09c0%2C5.42%2C2.15%2C8.14%2C6.44%2C8.14c2.18%2C0%2C3.74-0.66%2C4.68-1.98c0.94-1.32%2C1.4-3.35%2C1.4-6.08V46.65h2.81v14.9%0A%09%09C63.36%2C65.06%2C62.61%2C67.72%2C61.13%2C69.53z%22/%3E%0A%09%3Cpath%20d%3D%22M84.72%2C68c-0.37%2C0.86-0.92%2C1.61-1.64%2C2.23c-0.72%2C0.62-1.6%2C1.12-2.63%2C1.48s-2.21%2C0.54-3.53%2C0.54%0A%09%09c-1.73%2C0-3.32-0.33-4.77-0.99c-1.45-0.66-2.68-1.49-3.69-2.5l1.87-2.09c0.96%2C0.91%2C1.99%2C1.64%2C3.1%2C2.2c1.1%2C0.55%2C2.3%2C0.83%2C3.6%2C0.83%0A%09%09c1.68%2C0%2C3.01-0.38%2C3.98-1.15c0.97-0.77%2C1.46-1.82%2C1.46-3.17c0-0.58-0.1-1.1-0.29-1.58c-0.19-0.48-0.52-0.92-0.99-1.33%0A%09%09c-0.47-0.41-1.09-0.81-1.85-1.21c-0.77-0.4-1.73-0.8-2.88-1.21c-1.37-0.48-2.51-0.97-3.44-1.46c-0.92-0.49-1.67-1.02-2.23-1.58%0A%09%09c-0.56-0.56-0.97-1.19-1.22-1.89c-0.25-0.7-0.38-1.5-0.38-2.41c0-1.01%2C0.19-1.91%2C0.58-2.7c0.38-0.79%2C0.92-1.47%2C1.6-2.03%0A%09%09c0.68-0.56%2C1.51-0.99%2C2.48-1.28c0.97-0.29%2C2.05-0.43%2C3.22-0.43c1.68%2C0%2C3.11%2C0.24%2C4.3%2C0.72c1.19%2C0.48%2C2.31%2C1.14%2C3.37%2C1.98l-1.8%2C2.2%0A%09%09c-0.91-0.77-1.83-1.35-2.75-1.75c-0.92-0.4-2.02-0.59-3.29-0.59c-0.86%2C0-1.61%2C0.1-2.23%2C0.31c-0.62%2C0.2-1.13%2C0.47-1.53%2C0.81%0A%09%09c-0.4%2C0.34-0.68%2C0.73-0.86%2C1.17C72.09%2C51.54%2C72%2C52.01%2C72%2C52.52c0%2C0.53%2C0.07%2C1%2C0.22%2C1.42c0.14%2C0.42%2C0.43%2C0.83%2C0.86%2C1.22%0A%09%09s1.04%2C0.79%2C1.82%2C1.17c0.78%2C0.38%2C1.81%2C0.8%2C3.08%2C1.26c1.39%2C0.5%2C2.56%2C1.01%2C3.49%2C1.51s1.69%2C1.06%2C2.25%2C1.66%0A%09%09c0.56%2C0.6%2C0.97%2C1.26%2C1.21%2C1.98c0.24%2C0.72%2C0.36%2C1.55%2C0.36%2C2.48C85.28%2C66.21%2C85.1%2C67.13%2C84.72%2C68z%22/%3E%0A%09%3Cpath%20d%3D%22M91.11%2C71.85v-25.2h15.23v2.56H93.92v7.92h7.2v2.56h-7.2v9.61h12.96v2.56H91.11z%22/%3E%0A%3C/g%3E%0A%3C/svg%3E",
        "description": "The Fuse runtime enables you to deploy Spring Boot applications on OpenShift while leveraging the Fuse technology stack for middleware integration. The core technology provided by Fuse is Apache Camel for application integration including Spring Boot starters for the Camel components. The technology stack also provides transactions, Web services, security, management, and messaging clients.",
        "metadata": {
          "pipelinePlatform": "maven"
        },
        "missions": [
          {
            "id": "circuit-breaker",
            "versions": [
              {
                "id": "2.21.0-community",
                "name": "2.21.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "7.0.0-redhat",
                "name": "7.0.0 (Red Hat Fuse)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "configmap",
            "versions": [
              {
                "id": "2.21.0-community",
                "name": "2.21.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "7.0.0-redhat",
                "name": "7.0.0 (Red Hat Fuse)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "health-check",
            "versions": [
              {
                "id": "2.21.0-community",
                "name": "2.21.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "7.0.0-redhat",
                "name": "7.0.0 (Red Hat Fuse)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "rest-http",
            "versions": [
              {
                "id": "2.21.0-community",
                "name": "2.21.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "7.0.0-redhat",
                "name": "7.0.0 (Red Hat Fuse)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "id": "nodejs",
        "name": "Node.js",
        "icon": "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath d='M0 600h600V0H0z'/%3E%3C/clipPath%3E%3CclipPath id='b'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.085 5.085 0 0 1-2.545-4.407v-48.666c0-1.818.969-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.088 5.088 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3ClinearGradient id='c' x2='1' gradientTransform='scale(-86.48019 86.48019) rotate(-63.886 1.799 4.453)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.529' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%2383a178'/%3E%3C/linearGradient%3E%3CclipPath id='d'%3E%3Cpath d='M195.4 292.914a5.09 5.09 0 0 1 1.497-1.317l36.143-20.874 6.017-3.46a5.127 5.127 0 0 1 2.936-.665c.337.028.673.09 1.001.185l44.43 81.357a5.06 5.06 0 0 1-1.181.938l-27.588 15.925-14.579 8.39c-.417.24-.864.413-1.323.526z'/%3E%3C/clipPath%3E%3ClinearGradient id='e' x2='1' gradientTransform='scale(132.79816 -132.79816) rotate(-36.459 -2.712 -3.873)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.138' stop-color='%23687e67'/%3E%3Cstop offset='.697' stop-color='%239bb48f'/%3E%3Cstop offset='.908' stop-color='%239bb48f'/%3E%3Cstop offset='1' stop-color='%239bb48f'/%3E%3C/linearGradient%3E%3CclipPath id='f'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='g'%3E%3Cpath d='M237.627 382.331l-.58-.331h.774z'/%3E%3C/clipPath%3E%3ClinearGradient id='h' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 382.166)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='i'%3E%3Cpath d='M241.065 374.048a5.072 5.072 0 0 1-2.033-.655l-42.014-24.245 45.293-82.513a5.081 5.081 0 0 1 1.81.628l42.124 24.334a5.096 5.096 0 0 1 2.458 3.477l-46.178 78.89a5.295 5.295 0 0 1-1.035.102c-.142 0-.284-.006-.425-.018'/%3E%3C/clipPath%3E%3ClinearGradient id='j' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 320.348)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='k'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='l'%3E%3Cpath d='M290.279 292.38l-.279.477v-.639z'/%3E%3C/clipPath%3E%3ClinearGradient id='m' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 292.538)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='n'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='o'%3E%3Cpath d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/clipPath%3E%3ClinearGradient id='p' x2='1' gradientTransform='matrix(97.417 0 0 -97.417 192.862 279.968)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239bb48f'/%3E%3Cstop offset='.092' stop-color='%239bb48f'/%3E%3Cstop offset='.303' stop-color='%239bb48f'/%3E%3Cstop offset='.862' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%23687e67'/%3E%3C/linearGradient%3E%3CclipPath id='q'%3E%3Cpath d='M239.032 373.393l-42.134-24.315a5.087 5.087 0 0 1-2.545-4.407v-48.666c0-1.818.97-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.09 5.09 0 0 1-5.088 0'/%3E%3C/clipPath%3E%3CclipPath id='r'%3E%3Cpath d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/clipPath%3E%3ClinearGradient id='s' x2='1' gradientTransform='scale(-136.49806 136.49806) rotate(-63.886 .986 3.099)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23687e67'/%3E%3Cstop offset='.529' stop-color='%23687e67'/%3E%3Cstop offset='1' stop-color='%2383a178'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='%23689f63' d='M296.953 165.056c-1.46 0-2.912.38-4.19 1.12l-13.338 7.893c-1.99 1.114-1.019 1.509-.362 1.738 2.657.922 3.195 1.135 6.031 2.743.295.167.687.103.992-.076l10.247-6.083c.371-.206.895-.206 1.237 0l39.95 23.058c.372.212.61.64.61 1.08v46.105c0 .45-.238.872-.62 1.1l-39.933 23.039a1.25 1.25 0 0 1-1.23 0l-39.924-23.045a1.285 1.285 0 0 1-.634-1.094V196.53c0-.441.246-.86.63-1.068l10.944-6.323c5.938-2.97 9.574.528 9.574 4.04v45.52c0 .644.517 1.15 1.161 1.15h5.065c.634 0 1.158-.506 1.158-1.15v-45.52c0-7.924-4.316-12.47-11.829-12.47-2.309 0-4.127 0-9.202 2.502l-10.476 6.03a8.437 8.437 0 0 0-4.19 7.289v46.104c0 2.995 1.602 5.792 4.19 7.28L292.764 273c2.527 1.429 5.887 1.429 8.395 0l39.947-23.085a8.434 8.434 0 0 0 4.196-7.281V196.53a8.457 8.457 0 0 0-4.196-7.288l-39.947-23.065a8.375 8.375 0 0 0-4.206-1.121'/%3E%3Cpath fill='%23689f63' d='M309.293 196.818c-17.482 0-21.144 8.024-21.144 14.755 0 .64.514 1.151 1.154 1.151h5.165c.577 0 1.058-.415 1.148-.978.78-5.258 3.105-7.912 13.677-7.912 8.416 0 12 1.904 12 6.37 0 2.573-1.017 4.484-14.096 5.765-10.93 1.081-17.692 3.496-17.692 12.24 0 8.061 6.794 12.868 18.186 12.868 12.798 0 19.131-4.442 19.933-13.972a1.17 1.17 0 0 0-.305-.889 1.178 1.178 0 0 0-.846-.369h-5.185a1.15 1.15 0 0 0-1.12.903c-1.245 5.533-4.27 7.301-12.477 7.301-9.189 0-10.257-3.2-10.257-5.6 0-2.906 1.26-3.75 13.667-5.393 12.277-1.623 18.11-3.92 18.11-12.55 0-8.704-7.259-13.69-19.918-13.69m48.646 48.882h1.343c1.098 0 1.304.773 1.304 1.22 0 1.184-.816 1.184-1.264 1.184h-1.383zm-1.632 3.789h2.975c1.019 0 3.016 0 3.016-2.283 0-1.59-1.02-1.914-1.632-2.118 1.184-.081 1.264-.856 1.426-1.955.083-.692.206-1.875.448-2.281h-1.831c-.043.406-.33 2.607-.33 2.728-.118.49-.284.733-.894.733h-1.506v-3.461h-1.672zm-3.563-4.298c0-3.586 2.893-6.48 6.436-6.48 3.586 0 6.478 2.955 6.478 6.48 0 3.584-2.932 6.436-6.478 6.436-3.503 0-6.436-2.81-6.436-6.436m14.155-.022c0-4.236-3.464-7.7-7.7-7.7-4.196 0-7.7 3.423-7.7 7.7 0 4.359 3.587 7.7 7.7 7.7 4.157 0 7.7-3.341 7.7-7.7'/%3E%3Cpath fill='%23333' fill-rule='evenodd' d='M173.243 345.433a5.108 5.108 0 0 1-2.558 4.445l-42.355 24.375a4.977 4.977 0 0 1-2.331.674h-.438a5.052 5.052 0 0 1-2.34-.674l-42.354-24.375a5.132 5.132 0 0 1-2.561-4.445l.093-65.635c0-.913.474-1.762 1.277-2.21a2.461 2.461 0 0 1 2.54 0l25.173 14.414c1.592.945 2.56 2.614 2.56 4.439v30.664c0 1.828.969 3.52 2.555 4.429l10.718 6.173a5.092 5.092 0 0 0 2.564.687c.873 0 1.768-.226 2.544-.687l10.715-6.173a5.1 5.1 0 0 0 2.558-4.43v-30.663c0-1.825.982-3.504 2.564-4.44l25.165-14.413a2.49 2.49 0 0 1 2.557 0 2.556 2.556 0 0 1 1.27 2.21zm199.867-34.176c0-.456-.245-.88-.64-1.106l-14.549-8.386a1.282 1.282 0 0 0-1.277 0l-14.548 8.386c-.397.227-.64.65-.64 1.106v16.799c0 .456.243.879.64 1.108l14.546 8.402a1.28 1.28 0 0 0 1.281 0l14.547-8.402c.395-.23.64-.652.64-1.108zm3.93 124.403a2.56 2.56 0 0 1-3.805-2.235v-65a1.79 1.79 0 0 0-2.685-1.551l-10.609 6.112a5.115 5.115 0 0 1-5.112-.001l-42.37-24.453a5.115 5.115 0 0 1-2.56-4.431v-48.916c0-1.828.975-3.516 2.557-4.432l42.37-24.471a5.12 5.12 0 0 1 5.118 0l42.377 24.47a5.122 5.122 0 0 1 2.558 4.433V417.12a5.118 5.118 0 0 1-2.624 4.468zm141.091-107.165a5.116 5.116 0 0 1 2.546 4.424v11.854c0 1.823-.97 3.51-2.548 4.425l-42.099 24.443a5.117 5.117 0 0 1-5.127.007l-42.356-24.453a5.115 5.115 0 0 1-2.558-4.43v-48.903c0-1.84.987-3.537 2.584-4.446l42.093-23.985a5.112 5.112 0 0 1 5.017-.028l25.46 14.151a2.557 2.557 0 0 1 .032 4.455l-42.625 24.465a2.559 2.559 0 0 0-1.286 2.219v15.326c0 .914.488 1.76 1.281 2.216l13.266 7.648a2.555 2.555 0 0 0 2.554 0l13.272-7.648a2.556 2.556 0 0 0 1.28-2.216v-12.058a2.56 2.56 0 0 1 3.844-2.213z'/%3E%3Cpath fill='%23689f63' fill-rule='evenodd' d='M472.842 330.786a.98.98 0 0 0 .982 0l8.13-4.69a.983.983 0 0 0 .491-.851v-9.388a.982.982 0 0 0-.49-.851l-8.13-4.691a.98.98 0 0 0-.983 0l-8.124 4.69a.982.982 0 0 0-.49.852v9.388c0 .35.186.675.49.85z'/%3E%3C/g%3E%3Cg clip-path='url(%23b)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23c)' d='M239.032 373.393l-42.134-24.315a5.085 5.085 0 0 1-2.545-4.407v-48.666c0-1.818.969-3.497 2.544-4.408l42.133-24.334a5.093 5.093 0 0 1 5.091 0l42.124 24.334a5.093 5.093 0 0 1 2.543 4.408v48.668a5.084 5.084 0 0 1-2.545 4.405l-42.123 24.315a5.088 5.088 0 0 1-5.088 0'/%3E%3C/g%3E%3Cg clip-path='url(%23d)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23e)' d='M195.4 292.914a5.09 5.09 0 0 1 1.497-1.317l36.143-20.874 6.017-3.46a5.127 5.127 0 0 1 2.936-.665c.337.028.673.09 1.001.185l44.43 81.357a5.06 5.06 0 0 1-1.181.938l-27.588 15.925-14.579 8.39c-.417.24-.864.413-1.323.526z'/%3E%3C/g%3E%3Cg clip-path='url(%23f)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23g)'%3E%3Cpath fill='url(%23h)' d='M237.627 382.331l-.58-.331h.774z'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23i)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cpath fill='url(%23j)' d='M241.065 374.048a5.072 5.072 0 0 1-2.033-.655l-42.014-24.245 45.293-82.513a5.081 5.081 0 0 1 1.81.628l42.124 24.334a5.096 5.096 0 0 1 2.458 3.477l-46.178 78.89a5.295 5.295 0 0 1-1.035.102c-.142 0-.284-.006-.425-.018'/%3E%3C/g%3E%3Cg clip-path='url(%23k)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23l)'%3E%3Cpath fill='url(%23m)' d='M290.279 292.38l-.279.477v-.639z'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23n)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23o)'%3E%3Cpath fill='url(%23p)' d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23q)' transform='matrix(1.33333 0 0 -1.33333 0 800)'%3E%3Cg clip-path='url(%23r)'%3E%3Cpath fill='url(%23s)' d='M286.351 291.597l-42.177-24.333a5.084 5.084 0 0 0-1.861-.633l.84-1.53L290 292.218v.639l-1.158 1.979c-.347-1.348-1.263-2.528-2.491-3.239'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
        "description": "A JavaScript runtime built on Chrome's V8 JavaScript engine, using an event-driven, non-blocking I/O model for lightweight efficiency.",
        "metadata": {
          "pipelinePlatform": "node"
        },
        "missions": [
          {
            "id": "crud",
            "versions": [
              {
                "id": "v10-community",
                "name": "10.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v10-redhat",
                "name": "10.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-community",
                "name": "8.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-redhat",
                "name": "8.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "cache",
            "versions": [
              {
                "id": "v10-community",
                "name": "10.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v10-redhat",
                "name": "10.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-community",
                "name": "8.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-redhat",
                "name": "8.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "circuit-breaker",
            "versions": [
              {
                "id": "v10-community",
                "name": "10.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v10-redhat",
                "name": "10.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "runsOn": [
                      "!starter",
                      "!osio"
                    ]
                  }
                }
              },
              {
                "id": "v8-community",
                "name": "8.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-redhat",
                "name": "8.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "configmap",
            "versions": [
              {
                "id": "v10-community",
                "name": "10.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v10-redhat",
                "name": "10.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-community",
                "name": "8.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-redhat",
                "name": "8.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "health-check",
            "versions": [
              {
                "id": "v10-community",
                "name": "10.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v10-redhat",
                "name": "10.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-community",
                "name": "8.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-redhat",
                "name": "8.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "rest-http",
            "versions": [
              {
                "id": "v10-community",
                "name": "10.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v10-redhat",
                "name": "10.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-community",
                "name": "8.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-redhat",
                "name": "8.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "rest-http-secured",
            "versions": [
              {
                "id": "v10-community",
                "name": "10.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              },
              {
                "id": "v10-redhat",
                "name": "10.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-community",
                "name": "8.x (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              },
              {
                "id": "v8-redhat",
                "name": "8.x (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "id": "spring-boot",
        "name": "Spring Boot",
        "icon": "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='205.3' height='184.28'%3E%3Cpath fill='%2368bd45' d='M202.66 81.08l-40.43-70C158.72 5 150.1 0 143.08 0H62.22c-7 0-15.64 5-19.15 11.06l-40.43 70c-3.52 6.08-3.52 16 0 22.12l40.43 70c3.51 6.08 12.13 11.06 19.15 11.06h80.86c7 0 15.63-5 19.15-11.06l40.43-70c3.52-6.07 3.52-16.01 0-22.1zM93.91 38.72a8.34 8.34 0 1 1 16.67 0v49.81a8.34 8.34 0 1 1-16.67 0zM102.25 145A56.51 56.51 0 0 1 68.54 43.17a7.41 7.41 0 1 1 8.85 11.89 41.69 41.69 0 1 0 66.54 33.47A41.89 41.89 0 0 0 127 55a7.41 7.41 0 0 1 8.76-12 56.52 56.52 0 0 1-33.51 102z'/%3E%3C/svg%3E",
        "description": "Create stand-alone, production-grade Spring based Applications that you can \"just run\".",
        "metadata": {
          "pipelinePlatform": "maven"
        },
        "missions": [
          {
            "id": "crud",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "current-redhat",
                "name": "1.5.12.RELEASE (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "cache",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "current-redhat",
                "name": "1.5.12.RELEASE (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "circuit-breaker",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "current-redhat",
                "name": "1.5.12.RELEASE (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "configmap",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "current-osio",
                "name": "1.5.12.RELEASE (OSIO)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "current-redhat",
                "name": "1.5.12.RELEASE (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "health-check",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "current-redhat",
                "name": "1.5.12.RELEASE (RHOAR)",
                "booster": {}
              }
            ]
          },
          {
            "id": "istio-circuit-breaker",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                      "metadata": {
                        "app": {
                          "launcher": {
                              "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "istio-distributed-tracing",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "istio-routing",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "istio-security",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "rest-http",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "current-redhat",
                "name": "1.5.12.RELEASE (RHOAR)",
                "booster": {}
              }
            ]
          },
          {
            "id": "rest-http-secured",
            "versions": [
              {
                "id": "current-community",
                "name": "1.5.12.RELEASE (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              },
              {
                "id": "current-redhat",
                "name": "1.5.12.RELEASE (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "id": "wildfly-swarm",
        "name": "WildFly Swarm",
        "icon": "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' id='Layer_1' version='1' viewBox='0 0 128 128'%3E%3Cstyle%3E.st1{fill:%23f7931e}.st2{fill:%23585858}%3C/style%3E%3Cpath fill='%23333' d='M112.4 127.9H15.7c-8.6 0-15.6-7-15.6-15.6V15.6C.1 7 7.1 0 15.7 0h96.7C121 0 128 7 128 15.6v96.7c0 8.7-7 15.6-15.6 15.6z'/%3E%3Cpath d='M103.3 71.5L70.5 57.7c-.5-.2-.3-.9.2-.8l35.1 6.4c.3 0 .4.3.3.5l-2.2 7.5c-.1.2-.3.3-.6.2z' class='st1'/%3E%3Cpath d='M120.6 53.6L72 53.5c-.5 0-.6-.7-.1-.8L118.5 39c.3-.1.5.1.5.4l1.9 13.7c.1.2-.1.5-.3.5z' class='st2'/%3E%3Cpath d='M24.8 71.2l32.8-13.8c.5-.2.3-.9-.2-.8L22.3 63c-.3 0-.4.3-.3.5l2.2 7.5c.1.2.4.3.6.2z' class='st1'/%3E%3Cpath d='M7.6 53.6l48.6-.1c.5 0 .6-.7.1-.8L9.6 39c-.3-.1-.5.1-.5.4l-2 13.7c0 .2.2.5.5.5z' class='st2'/%3E%3Cpath d='M64.3 78.1l2.1-1.1-1.9 11.6c-.1.5-.8.5-.8 0L61.8 77l2.1 1.1c.1.1.2.1.4 0z' class='st1'/%3E%3Cpath d='M60.6 68.8l-.1.1-.1-.2zm7.1-.1v.2l-.1-.1z'/%3E%3Cpath d='M63.9 44.9l-6.5 3.4c-.2.1-.2.5 0 .6l6.5 3.4c.1.1.2.1.3 0l6.5-3.4c.2-.1.2-.5 0-.6l-6.5-3.4c-.1-.1-.2-.1-.3 0zm5 16.2c0 .1 0 .1 0 0l-.1.8-.2 1.5-.6 3.5-2 1-1.6.8-.1.1c-.1.1-.3.1-.4 0l-.1-.1-1.6-.7-2-1-.6-3.5-.2-1.5-.1-.7v-.1l.8.4 1.6.8 2.3 1.2c.1.1.3.1.4 0l2.3-1.2 1.6-.8.6-.5z' class='st1'/%3E%3Cpath d='M67.7 68.9l-.2 1.5-.8 4.8-2.4 1.2c-.1.1-.3.1-.4 0l-2.4-1.2-.8-4.8-.2-1.5.1-.1 1.6.8 1.7.9c.1.1.3.1.4 0l1.7-.9 1.6-.8.1.1z' class='st2'/%3E%3C/svg%3E",
        "description": "An innovative approach to packaging and running Java EE applications, packaging them with just enough of the server runtime to \"java -jar\" your application.",
        "metadata": {
          "pipelinePlatform": "maven"
        },
        "missions": [
          {
            "id": "crud",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "7.1.0.redhat-77 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "cache",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "7.1.0.redhat-77 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "circuit-breaker",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "7.1.0.redhat-77 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!starter",
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "configmap",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "!osio"
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "7.1.0.redhat-77 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "health-check",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "all"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "7.1.0.redhat-77 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "istio-circuit-breaker",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "istio-distributed-tracing",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "istio-routing",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "istio-security",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "local"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "rest-http",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "all"
                        ]
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "7.1.0.redhat-77 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": [
                          "!osio"
                        ]
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "id": "rest-http-secured",
            "versions": [
              {
                "id": "community",
                "name": "2018.5.0 (Community)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              },
              {
                "id": "redhat",
                "name": "7.1.0.redhat-77 (RHOAR)",
                "booster": {
                  "metadata": {
                    "app": {
                      "launcher": {

                        "runsOn": "none"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ] as Runtime[]);
    return runtimes;
  }
}
