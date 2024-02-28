import StatisticalObj from '@/components/statistical_obj';

export type APIResults = {
    message: string;
}

export type APIBody = {
    nameList: StatisticalObj[];
    selName: string | null;
}