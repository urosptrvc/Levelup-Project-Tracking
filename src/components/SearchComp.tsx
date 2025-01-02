'use client'
import { Input } from './ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce';

type Props = {
    placeholder: string
}

const SearchComp = ({ placeholder }: Props) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`);
    }, 300);

    return (
        <Input 
            placeholder={placeholder} 
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
        />
    );
}

export default SearchComp;