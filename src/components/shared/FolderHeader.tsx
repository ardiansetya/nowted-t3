import React from 'react'

const FolderHeader = ({folderName}: {folderName: string}) => {
  return (
    <div className='py-4 px-6'>
      <h1 className='text-2xl text-primary'>{folderName}</h1>
      <div className='border-b border-primary mt-2' />
    </div>
  );
}

export default FolderHeader