import React, { useEffect, useState } from "react";
import './style.scss';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideSpinner, showSpinner } from "src/Utils/Helper";
import _ from 'lodash'
import { saveDataAction, setCategoryData } from "src/Redux/Actions";
import { upldateDomList } from "src/Constant";
import { toast } from "react-toastify";
import { join } from "redux-saga/effects";

export default function FormPage() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([]) 
    const [terms, setTerms] = useState(false)

    const {
        category_data,
        saved_data,
        getCategories_loading,
        saveData_loading
    } = useSelector(state => state.Core)

    useEffect(() => {
        if (!getCategories_loading) {
            hideSpinner()
            console.log('=== category data ===', category_data)
            if (!_.isEmpty(category_data)) {
                setSelectedCategories(category_data.categories)
                setTerms(!_.isEmpty(category_data.categories) && category_data.categories[0] !== '')
                setName(category_data.name)
            }
        }
    }, [getCategories_loading, category_data])

    useEffect(() => {
        if (!saveData_loading) {
            hideSpinner()
            console.log('=== saved ===', saved_data);
            if (!_.isEmpty(category_data)) {
                setName(category_data.name)
                setTerms(true)
            }
        }
        // const updatedDom = upldateDomList(category_data.category_dom, category_data.categories)
        // dispatch(setCategoryData({...category_data, category_dom: updatedDom}))
    }, [dispatch, saveData_loading, saved_data])

    useEffect(() => {
        if (_.isEmpty(category_data)) return
        const selectInput = document.getElementById('selectInput');
        const selectedValues = selectedCategories;
        console.log(selectedValues)
        const options = selectInput.options;
        for (let i = 0; i < options.length; i++) {
            if (selectedValues.includes(parseInt(options[i].value))) {
                options[i].selected = true;
            } else {
                options[i].selected = false;
            }
        }
    }, [selectedCategories])

    const getCategoriesData = () => {
        if (_.isEmpty(category_data)) return '<option value="0">Loading categories....</option>'
        return category_data.category_dom
    }

    const handleSelect = (e) => {
        const value = e.target.value
        const index = selectedCategories.findIndex(function (item) {
            return parseInt(item) === parseInt(value)
        })
        if (index >= 0) {
            selectedCategories.splice(index, 1)
            setSelectedCategories(selectedCategories)
        } else {
            setSelectedCategories([...selectedCategories, parseInt(value)])
        }
    }

    const submitData = () => {
        if (_.isEmpty(name)) {
            toast("please enter your name", "error") 
            return
        }
        if (selectedCategories && selectedCategories.length === 1) {
            toast("please select categories")
            return;
        }
        showSpinner()
        const data = {
            name: name,
            categories: selectedCategories.join(","),
            terms: terms
        }
        dispatch(saveDataAction(data))
    }

    const handleCheck = () => setTerms(!terms)

    return (
        <div className="form-wrapper">
            <div className="container">
                <div className="form-card">
                    <h5>Please enter your name and pick the Sectors you are currently involved in. </h5>
                    <div className="f-content">
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Sectors</label>
                            <select className="form-control" size={10} name="sectors" multiple disabled={_.isEmpty(category_data)}
                                     onChange={handleSelect} dangerouslySetInnerHTML={{ __html: getCategoriesData() }} id="selectInput"></select>
                        </div>
                        <Form.Check type={'checkbox'} >
                            <Form.Check.Input 
                                key={Math.random()}
                                type={'checkbox'} 
                                isValid 
                                checked={terms}
                                onChange={handleCheck}/>
                            <Form.Check.Label>{terms ? "Accepted" : "Agree to terms"}</Form.Check.Label>
                            {/* <Form.Control.Feedback type="valid">
                            You did it!
                            </Form.Control.Feedback> */}
                        </Form.Check>
                        <div className={`btn btn-primary mt-4 ${ terms ? '': 'disabled'}`} onClick={() => submitData()}>Save</div>
                        {/* <div className="btn btn-secondary mt-2">View Data</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}