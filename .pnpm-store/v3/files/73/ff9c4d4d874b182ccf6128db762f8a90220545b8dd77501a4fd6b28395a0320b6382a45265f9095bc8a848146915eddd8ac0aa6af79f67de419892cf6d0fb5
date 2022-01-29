import { Node as ProsemirrorNode, Schema, Selection, TableRect, Transaction } from '@milkdown/prose';
export declare type CellPos = {
    pos: number;
    start: number;
    node: ProsemirrorNode;
};
export declare const findTable: (selection: Selection) => import("@milkdown/prose").ContentNodeWithPos | undefined;
export declare const getCellsInColumn: (columnIndex: number) => (selection: Selection) => CellPos[] | undefined;
export declare const getCellsInRow: (rowIndex: number) => (selection: Selection) => CellPos[] | undefined;
export declare const createTable: (schema: Schema, rowsCount?: number, colsCount?: number) => ProsemirrorNode<any>;
export declare const selectLine: (type: 'row' | 'col') => (index: number) => (tr: Transaction) => any;
export declare const getCellsInTable: (selection: Selection) => {
    pos: number;
    start: number;
    node: ProsemirrorNode<any> | null | undefined;
}[] | undefined;
export declare const selectTable: (tr: Transaction) => any;
export declare function addRowWithAlignment(tr: Transaction, { map, tableStart, table }: TableRect, row: number): Transaction<any>;
//# sourceMappingURL=utils.d.ts.map