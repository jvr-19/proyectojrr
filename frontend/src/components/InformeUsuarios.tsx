import '../App.css';
import React from 'react';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import Box from '@mui/material/Box';

function InformeUsuarios({ datos }: { datos: any[] }) {

    return (
        <>
            <Box sx={{ padding: 4 }}>
                <MaterialTable
                    title="Informe de Usuarios"
                    columns={[
                        {
                            title: 'Nombre', field: 'nombre', filtering: true,
                        },
                        {
                            title: 'Login', field: 'login', filtering: false,
                        },
                        {
                            title: 'Password', field: 'password', filtering: false,
                        },
                        {
                            title: 'Rol', field: 'rol', filtering: false,
                        },
                    ]}
                    data={datos}
                    options={{
                        columnsButton: true, filtering: true, draggable: true,
                        headerStyle: {
                            backgroundColor: '#90caf9', color: '#000000',
                        },
                        exportMenu: [
                            {
                                label: 'Exportar a CSV',
                                exportFunc: (cols, data) => ExportCsv(cols, data, 'Informe_Usuarios'),
                            },
                            {
                                label: 'Exportar a PDF',
                                exportFunc: (cols, data) => ExportPdf(cols, data, 'Informe_Usuarios'),
                            },
                        ],
                    }}
                />
            </Box>
        </>
    )
}

export default InformeUsuarios