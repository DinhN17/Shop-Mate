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


// export default function EditableText({ text, textAlign, fontSize, handleSaveButton }) {
export default function EditableText({ text, textAlign, fontSize }) {
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
                        // onClick={handleSaveButton} 
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
            <Input as={EditableInput} />
            <EditableControls />
        </Editable>
    );
};

// export default EditableText;