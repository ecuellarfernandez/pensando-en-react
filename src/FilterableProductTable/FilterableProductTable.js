import React, { useState } from 'react';

function ProductRow({ product }){

    const name = product.stocked ?
    product.name :
    <span style={{color:'red'}}>{product.name}</span>

    return(
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )

}

function ProductCategoryRow({ category }){
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    )
}

function ProductTable( { products, filterText, isStockOnly } ){

    const rows=[];
    let lastCategory = null;
    
    products.forEach((product)=>{
        if(product.name.indexOf(filterText) === -1){
            return;
        }
        if(isStockOnly && !product.stocked){
            return;
        }
        if(product.category !== lastCategory){
            rows.push(
                <ProductCategoryRow key={product.category} category={product.category}/>
            );
        }
        rows.push(
            <ProductRow key={product.name} product={product}/>
        )
        lastCategory = product.category;
    })

    return(
        <table>
            <tbody>{rows}</tbody>
        </table>
    )

}

function SearchBar({ filterText, isStockOnly }){
    return(
        <form>
            <input 
                type="text"
                placeholder="Search..."
                value={filterText}
            />
            <label>
                <input
                    type="checkbox"
                    checked={isStockOnly}
                /> Only show products in stock
            </label>
        </form>
    )
}

export default function FilterableProductTable(){

    const [text, setText] = useState('');
    const [isStock, setIsStock] = useState(false);

    return(
        <div>
            <SearchBar 
                filterText={text}
                isStockOnly={isStock}
            />
            <ProductTable 
                products={PRODUCTS}
                filterText={text}
                isStockOnly={isStock}
            />
        </div>
    )
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];
  