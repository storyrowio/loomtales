import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@radix-ui/react-alert-dialog";
import {Button} from "@/components/ui/button.jsx";
import {AlertDialogFooter, AlertDialogHeader} from "@/components/ui/alert-dialog.jsx";
import PropTypes from "prop-types";

DeleteConfirmation.propTypes = {
    triggerButton: PropTypes.element
};

export default function DeleteConfirmation(props) {
    const {
        triggerButton
    } = props;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggerButton}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}