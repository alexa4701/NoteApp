import React from 'react'
import { Row, Col, Collapse } from 'reactstrap'

const NoteCollapse = ({ note, open }) => {
    return (
        <Collapse isOpen={open}>
            <br />
            <Row>
                <Col xs="12">
                    <div className="note-txt">
                        "{note.description}"
                    </div>
                </Col>
            </Row>
        </Collapse>
    )
}

export default NoteCollapse