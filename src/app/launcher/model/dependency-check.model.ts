import { DependencySnapshotItem } from './dependency-snapshot-item.model';
export class DependencyCheck {
  mavenArtifact: string;
  groupId: string;
  projectName: string;
  projectVersion: string;
  spacePath: string;
  dependencySnapshot: DependencySnapshotItem;
}
