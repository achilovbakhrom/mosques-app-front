import { ReportLeafNode, ReportNode } from "../model/Report";

// Type guard functions
export function isReportLeafNode(
  node: ReportNode | ReportLeafNode
): node is ReportLeafNode {
  return "data" in node;
}

export function isReportNode(
  node: ReportNode | ReportLeafNode
): node is ReportNode {
  return !("data" in node);
}
