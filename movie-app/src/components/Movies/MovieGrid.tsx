import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useEffect } from 'react';
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { MultiSelectChangeParams } from "primereact/multiselect";
import { RatingChangeParams } from "primereact/rating";
import { useState } from "react";
import MovieListItem from './MovieListItem';
import MovieGridItem from './MovieGridItem';

export const MovieGrid = ({movies}: any) => {
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState('!vote_average');
    const [sortOrder, setSortOrder] = useState(null as any);
    const [sortField, setSortField] = useState('!vote_average');
	const [first, setFirst] = useState(0);
	const perPage = 20;

	const sortOptions = [
        {label: 'Rating asc', value: '!vote_average'},
        {label: 'Name asc', value: 'original_title'},
        {label: 'Year asc', value: '!release_date'},
		{label: 'Rating desc', value: 'vote_average'},
        {label: 'Name desc', value: '!original_title'},
        {label: 'Year desc', value: 'release_date'},
    ];
	const onSortChange = (event: any) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }
	useEffect(() => {
        setSortOrder(-1);
		setSortField('vote_average');
		console.log(movies)
    }, []);
	const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
				<div className="col-1" style={{alignSelf: 'center'}}>
					<p>Sort By</p>
				</div>
                <div className="col-5" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By" onChange={onSortChange}/>
                </div>
                <div className="col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }
	const itemTemplate = layout === 'list' ? MovieListItem() : MovieGridItem();
    const header = renderHeader();
	return (
			<div className="dataview-demo">
				<div className="card">
					<DataView 
						value={movies.results} 
						layout={layout} 
						header={header}
						itemTemplate={itemTemplate} 
						paginator 
						rows={12}
						totalRecords={ movies.total_pages }
						sortOrder={sortOrder} 
						sortField={sortField} />
				</div>
			</div>
	)
}
export default MovieGrid;

function useMountEffect(arg0: () => void) {
	throw new Error('Function not implemented.');
}
