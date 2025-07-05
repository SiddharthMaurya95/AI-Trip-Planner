import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
function LoadingDialog({loading}) {
  return (
      <AlertDialog open={loading}>
 
  <AlertDialogContent className='bg-white'>
    <AlertDialogTitle></AlertDialogTitle>
        <div className='flex flex-col items-center py-10'>
            <img alt='loading' src={'/loader.gif'} width={100} height={100}></img>
            please wait... AI working on your trip
        </div>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default LoadingDialog
