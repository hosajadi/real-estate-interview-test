import { IReportMeta } from 'src/core/interfaces';

export const generateReportMeta = (input: {
    page: number;
    pageSize: number;
    total: number;
}): IReportMeta => {
    return {
        page: Number(input.page),
        pageSize: Number(input.pageSize),
        total: Number(input.total),
        totalPages: Math.ceil(input.total / input.pageSize),
    };
};
