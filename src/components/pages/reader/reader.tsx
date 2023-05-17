import { FC, useEffect, useState } from 'react'
import Reader from '../../reader/Reader';
import { useParams } from 'react-router-dom';
import { getFile } from '../../../http-requests';
import { FileInfo } from '../../../types';

const ReaderPage: FC = () => {
    const {id} = useParams();
    const [fileInfo, setFileInfo] = useState<FileInfo>({
        publicId: "",
        tempUrl: "",
        urlExpiresAtUtc: new Date()
    });
    
    useEffect(() => {  
        getFile(id!)
        .then(x => setFileInfo(x!))
    }, []) 

    return (
        <>
            <Reader bookId={id!} url={fileInfo!.tempUrl}/>
        </>  
    )
}

export default ReaderPage