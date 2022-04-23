import { Column } from "rbx";
import React from "react";
import { push as Menu } from 'react-burger-menu'
import '../../../styles/sidebar.scss'
import ListNotes from "../list";
import Search from "../search";

const SideBar = (props) => {
    return (
        <>
            <Menu
                pageWrapId={"notes-editor"}
                isOpen={props.isOpen}
                onStateChange={(state) => props.setIsOpen(state.isOpen)}
                disableAutoFocus
                outerContainerId={"notes"}
                customBurgerIcon={false}
                customCrossIcon={false}
            >
                <Column.Group>
                    <Column size={10} offset={1}>
                        <Search searchNotes={props.searchNotes} getNotes={props.getNotes} />
                    </Column>
                </Column.Group>
                <ListNotes
                    notes={props.notes}
                    selectNote={props.selectNote}
                    current_note={props.current_note}
                    createNote={props.createNote}
                    deleteNote={props.deleteNote} />
            </Menu>
        </>
    )
}


export default SideBar;

