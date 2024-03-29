import React from "react";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          activeItem: this.props.activeItem
        };
    }

    handleChange = e => {
        let { name, value } = e.target;
        if(e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({
            activeItem: activeItem
        });
    };

    render() {
        const {toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Todo item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text"
                                   name="title"
                                   value={this.state.activeItem.title}
                                   onChange={this.handleChange}
                                   placeholder="Enter to do title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">
                                Description
                            </Label>
                            <Input type="text"
                                   name="description"
                                   value={this.state.activeItem.description}
                                   checked={this.state.activeItem.completed}
                                   onChange={this.handleChange}
                            />
                            <FormGroup check>
                                <Label for="completed">
                                    <Input type="checkbox"
                                           name="completed"
                                           checked={this.state.activeItem.completed}
                                           onChange={this.handleChange}
                                    />
                                    Completed
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}