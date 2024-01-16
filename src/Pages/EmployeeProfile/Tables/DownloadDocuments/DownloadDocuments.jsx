import React from 'react'
import MainTable from '../../../../Components/MainTable/MainTable'

const DownloadDocuments = () => {

    const tableHeading = [
        { heading: 'Documents' },
        { heading: 'Date' },
        { heading: '' },
        { heading: 'Download' },
    ]

    const tableKeys = ['document', 'date']

    const data = [
        {
            document: 'Aadhar Card',
            date: '13/04/2022'
        },
        {
            document: 'Aadhar Card',
            date: '13/04/2022'
        },
        {
            document: 'Aadhar Card',
            date: '13/04/2022'
        }
    ]


    return (
        <React.Fragment>
            <h3 className='uni_heading'>Download Documents</h3>
            <MainTable headings={tableHeading} keys={tableKeys} data={data} />
        </React.Fragment>
    )
}

export default DownloadDocuments
