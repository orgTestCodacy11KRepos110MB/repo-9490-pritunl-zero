/// <reference path="../References.d.ts"/>
import * as ChartTypes from '../types/ChartTypes';

export const SYNC = 'endpoint.sync';
export const SYNC_NAMES = 'endpoint.sync_names';
export const TRAVERSE = 'endpoint.traverse';
export const FILTER = 'endpoint.filter';
export const CHANGE = 'endpoint.change';

export interface Endpoint {
	id: string;
	name?: string;
	roles?: string[];
	client_key?: ClientKey;
	has_client_key?: boolean;
	reset_client_key?: boolean;
	data?: EndpointData;
	info?: EndpointInfo;
}

export interface EndpointInfo {
	alerts?: {[key: string]: string};
}

export interface EndpointData {
	hostname?: string;
	uptime?: number;
	platform?: string;
	virtualization?: string;
	cpu_cores?: number;
	mem_total?: number;
	swap_total?: number;
	huge_total?: number;
}

export interface ClientKey {
	secret?: string;
}

export interface Filter {
	id?: string;
	name?: string;
	role?: string;
}

export type Endpoints = Endpoint[];

export type EndpointRo = Readonly<Endpoint>;
export type EndpointsRo = ReadonlyArray<EndpointRo>;

export interface EndpointDispatch {
	type: string;
	data?: {
		id?: string;
		endpoint?: Endpoint;
		endpoints?: Endpoints;
		page?: number;
		pageCount?: number;
		filter?: Filter;
		count?: number;
	};
}

export interface SystemChart {
	cpu_usage?: ChartTypes.Points;
	mem_usage?: ChartTypes.Points;
	swap_usage?: ChartTypes.Points;
	huge_usage?: ChartTypes.Points;
}

export interface LoadChart {
	load1?: ChartTypes.Points;
	load5?: ChartTypes.Points;
	load15?: ChartTypes.Points;
}

export type DiskChart = {[key: string]: ChartTypes.Points};

export type DiskIoChart = {[key: string]: ChartTypes.Points};

export type NetworkChart = {[key: string]: ChartTypes.Points};
