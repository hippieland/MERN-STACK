import React from 'react';
import Select from 'react-select';

const options=[
    {label: 'Testimonio', value:'Testimonio'},
    {label: 'Caso', value:'Caso'},
    {label: 'Informe', value:'informe'}
]

function CustomSelect(label){
    return <div>
        <h1>{label}</h1>
        <Select options={options} />
    </div>
}

export default CustomSelect;