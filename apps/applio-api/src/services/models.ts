import type { Context } from 'hono';
import { initializeSupabase } from '../utils/database';

export const getFilteredEntries = async (page: number, pageSize: number, c: Context, filters: { algorithm?: string; tags?: string, order?: string }) => {
    const supabase = initializeSupabase(c);
    
    const minPageSize = 1; 
    const maxPageSize = 50; 

    if (pageSize < minPageSize) {
        return {
            status: 400,
            message: `Page size must be at least ${minPageSize}.`
        };
    } 
    if (pageSize > maxPageSize) {
        return {
            status: 400,
            message: `Page size must not exceed ${maxPageSize}.`
        };
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let query = supabase.from('models').select('*').range(startIndex, endIndex - 1);

    if (filters.algorithm) {
        query = query.filter('algorithm', 'ilike', `%${filters.algorithm}%`);
    }

    if (filters.tags) {
        query = query.filter('tags', 'ilike', `%${filters.tags}%`);
    }

    if (filters.order === 'recent') {
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error getting filtered data', error);
        return {
            status: 500,
            message: 'Error getting data from database.',
        };
    }

    return {
        status: 200,
        data: data || [],
    };
};

export const getFilteredEntriesByName = async (name: string, page: number, pageSize: number, c: Context, filters: { algorithm?: string; tags?: string, order?: string }) => {
    const supabase = initializeSupabase(c);

    const minNameLength = 3;
    const minPageSize = 1; 
    const maxPageSize = 50; 

    console.log(name.length);
    if (name.length < minNameLength) {
        return {
            status: 400,
            message: `Name must be at least ${minNameLength} characters.`
        };
    }

    if (pageSize < minPageSize) {
        return {
            status: 400,
            message: `Page size must be at least ${minPageSize}.`
        };
    } 
    if (pageSize > maxPageSize) {
        return {
            status: 400,
            message: `Page size must not exceed ${maxPageSize}.`
        };
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let query = supabase.from('models').select('*').filter('name', 'ilike', `%${name}%`).range(startIndex, endIndex - 1);

    if (filters.algorithm) {
        query = query.filter('algorithm', 'ilike', `%${filters.algorithm}%`);
    }

    if (filters.tags) {
        query = query.filter('tags', 'ilike', `%${filters.tags}%`);
    }

    if (filters.order === 'recent') {
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error getting filtered data', error);
        return {
            status: 500,
            message: 'Error getting data from database.',
        };
    }

    return {
        status: 200,
        data: data || [],
    };
};

