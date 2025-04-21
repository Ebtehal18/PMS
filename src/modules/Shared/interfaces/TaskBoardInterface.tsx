export type status='ToDo'|'InProgress'|'Done'

export interface ITaskBoard{
    id:number
title:string,
description:string,
status:status
}
export interface TaskBoardResponse{
    pageNumber: number,
    pageSize: number,
    data:ITaskBoard[],
totalNumberOfRecords: number,
    totalNumberOfPages: number
}