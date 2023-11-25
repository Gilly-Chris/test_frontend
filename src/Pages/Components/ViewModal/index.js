import React, { useEffect, useState } from "react";
import './style.scss';
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import _ from 'lodash';

export default function ViewModal({isOpen, onClose }) {
    const [sectors, setSectors] = useState(null)

    const {
        category_data,
        saved_data
    } = useSelector(state => state.Core)

    useEffect(() => {
        const mySectors = []
        const domList = category_data.category_dom
        category_data.categories.forEach(element => {
            let index = domList.findIndex(item => {
                return item.includes(`value="${parseInt(element)}"`)
            })
            if (index >= 0) mySectors.push(domList[index])
        });
        setSectors(mySectors.map(sector => { return sector.replaceAll("option", 'p')}).join(''))
    }, [sectors, saved_data])

    return (
        <Modal className="view-modal" show={isOpen} onHide={onClose}>
            <Modal.Header >
                <h4>Current Data</h4>
                <div className="close" onClick={onClose}>Close</div>
            </Modal.Header>
            <Modal.Body>
                <div className="view-content">
                    <h5>Name</h5>
                    <div className="info">{_.isEmpty(category_data.name) ? 'No name': category_data.name }</div>
                    <h5>My Sectors</h5>
                    <div className="info">
                        { sectors && <div dangerouslySetInnerHTML={{ __html: sectors }}></div>}
                        { !sectors && <div className="">No sectors</div>}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}