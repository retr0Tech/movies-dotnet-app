import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useEffect } from 'react';
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { MultiSelectChangeParams } from "primereact/multiselect";
import { RatingChangeParams } from "primereact/rating";
import { useState } from "react";
import MovieListItem from './MovieListItem';
import MovieGridItem from './MovieGridItem';

export const MovieGrid = ({movies}: any) => {
	const [products, setProducts] = useState(null as any);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null as any);
    const [sortOrder, setSortOrder] = useState(null as any);
    const [sortField, setSortField] = useState(null as any);

	const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
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
	const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
                </div>
                <div className="col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();
	return (
			<div className="dataview-demo">
				<div className="card">
					<DataView 
						value={movies.results} 
						layout={layout} 
						header={header}
						itemTemplate={layout === 'list' ? MovieListItem as any : MovieGridItem as any} 
						paginator 
						rows={10}
						sortOrder={sortOrder} 
						sortField={sortField} />
				</div>
			</div>
	)
}
export default MovieGrid;