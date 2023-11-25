import React, { useEffect, useState } from "react";
import './style.scss';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideSpinner, showSpinner } from "src/Utils/Helper";
import _ from 'lodash'
import { saveDataAction, setCategoryData, toggleViewModal } from "src/Redux/Actions";
import { upldateDomList } from "src/Constant";
import { toast } from "react-toastify";
import { ViewModal } from "../Components";

export default function FormPage() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [categoryDom, setCategoryDom] = useState([]) 
    const [terms, setTerms] = useState(true)

    const {
        category_data,
        saved_data,
        getCategories_loading,
        saveData_loading,
        viewModalOpen
    } = useSelector(state => state.Core)

    useEffect(() => {
        if (!getCategories_loading) {
            hideSpinner()
            console.log('=== category data ===', category_data)
            if (!_.isEmpty(category_data)) {
                setCategoryDom(category_data.category_dom)
                setSelectedCategories(category_data.categories)
                setTerms(category_data.categories.filter(item => item !== '').length > 0)
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
        if (_.isEmpty(category_data)) return;
        const updatedDom = upldateDomList(category_data.category_dom, category_data.categories)
        dispatch(setCategoryData({...category_data, category_dom: updatedDom}))
    }, [dispatch, saveData_loading, saved_data])

    const categoryList = () => selectedCategories.filter(item => item !== '')

    const getCategoriesData = () => _.isEmpty(categoryDom) ? '<option value="0">Loading categories....</option>': categoryDom.join('') 

    // handle input select
    const handleSelect = (e) => {
        const value = e.target.value
        const selectOption = e.target.querySelector(`option[value="${e.target.value}"]`);
        if (selectOption.hasAttribute('selected')) {
            selectOption.removeAttribute('selected')
        } else {
            selectOption.setAttribute('selected', 'true')
        }
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
        if (categoryList().length === 0) {
            toast("please select sectors")
            return;
        }
        showSpinner()
        // const formData = new FormData()
        const data = {
            name: name,
            categories: selectedCategories.join(","),
            terms: terms
        }
        dispatch(saveDataAction(data))
    }

    const handleCheck = () => setTerms(!terms)

    return (
        <>
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
                                checked={terms}
                                onChange={handleCheck}/>
                            <Form.Check.Label>{terms ? "Accepted" : "Agree to terms"}</Form.Check.Label>
                        </Form.Check>
                        <div className={`btn btn-primary mt-4 ${ terms ? '': 'disabled'}`} onClick={() => submitData()}>Save</div>
                        <div className={`btn btn-secondary mt-2 ${_.isEmpty(category_data) ? 'disabled': ''}`} onClick={() => dispatch(toggleViewModal(true))}>View</div>
                    </div>
                </div>
            </div>
        </div>
        { category_data && <ViewModal isOpen={viewModalOpen} onClose={() => dispatch(toggleViewModal(false))} /> }
        </>
    )
}