"use client"

import { createContext, useCallback, useReducer } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/ui/dialog';

export type DialogType = {
  id?: string,
  title?: string;
  description?: string;
  dialogChildren: React.ReactNode;
};

export type DialogContextType = {
  isOpen: boolean;
  openDialog: (content: Omit<DialogType, 'id'>) => void;
  closeDialog: () => void;
  modalContent: DialogType;
};

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const actionTypes = {
  OPEN_DIALOG: "OPEN_DIALOG",
  CLOSE_DIALOG: "CLOSE_DIALOG",
} as const;

type ActionType = typeof actionTypes

const initialState = (): DialogType => ({
  id: '',
  title: '',
  description: '',
  dialogChildren: null,
});

type Action =
  | {
    type: ActionType["OPEN_DIALOG"]
    dialog: DialogType
  }
  | {
    type: ActionType["CLOSE_DIALOG"]
    dialogId?: DialogType["id"]
  }

interface State {
  dialog: DialogType;
  isOpen: boolean;
}

const dialogReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.OPEN_DIALOG:
      return {
        ...state,
        dialog: {
          ...action.dialog,
          id: genId(),
        },
        isOpen: true,
      };
    case actionTypes.CLOSE_DIALOG:
      return {
        ...state,
        dialog: initialState(),
        isOpen: false,
      };
    default:
      return state;
  }
};

export const DialogProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    dialog: initialState(),
    isOpen: false,
  });

  const { isOpen, dialog } = state;

  const openDialog = useCallback((content: Omit<DialogType, 'id'>) => {
    dispatch({
      type: actionTypes.OPEN_DIALOG,
      dialog: content
    });
  }, [])

  const closeDialog = useCallback(() => {
    dispatch({
      type: actionTypes.CLOSE_DIALOG
    });
  }, [])

  return (
    <DialogContext.Provider value={{
      isOpen,
      openDialog,
      closeDialog,
      modalContent: dialog,
    }}>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent
          className="flex flex-col gap-y-2 w-2xl overflow-hidden h-[640px]"
        >
          {dialog?.title && (
            <DialogTitle>
              {dialog.title}
            </DialogTitle>
          )}
          {dialog?.description && (
            <DialogDescription>
              {dialog.description}
            </DialogDescription>
          )}
          {dialog.dialogChildren}
        </DialogContent>
      </Dialog>
      {children}
    </DialogContext.Provider>
  )
};