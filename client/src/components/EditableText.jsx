import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    Input
  } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';


// export default function EditableText({ text, textAlign, fontSize, handleSaveButton }) {
export default function EditableText({ text, textAlign, fontSize, handleSaveButton, handleSaveButtonProps }) {
    
    const [update, setUpdate] = useState('');

    const onChangeHandler = (event) => {
        setUpdate(event.target.value);
    };

    const submitButtonHandler = async () => {
        await handleSaveButton(update, handleSaveButtonProps);
        setUpdate('');
    };

    const EditableControls = () => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps
        } = useEditableControls();

        return isEditing ? (
            <span>
                <ButtonGroup size="sm">
                    <IconButton 
                        icon={<CheckIcon />} 
                        {...getSubmitButtonProps()}
                        onClick={submitButtonHandler} 
                    />
                    <IconButton 
                        icon={<CloseIcon />} 
                        {...getCancelButtonProps()} 
                    />
                </ButtonGroup>
            </span>
        ) : (
            <span>
                <IconButton 
                    size="sm"
                    icon={<EditIcon />} 
                    {...getEditButtonProps()} 
                />
            </span>
        );
    };

    return (
        <Editable 
            defaultValue={text}
            textAlign={"textAlign"}
            fontSize={"fontSize"}
            isPreviewFocusable
        >
            <EditablePreview />
            <Input as={EditableInput} 
                onChange={onChangeHandler}
            />
            <EditableControls />
        </Editable>
    );
};

// export default EditableText;