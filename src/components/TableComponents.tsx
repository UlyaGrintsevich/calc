import React from 'react';
import {useExcel} from '../contexts/useExcel';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@mui/material';
import NumberInput from './NumberInput';
import {PERIODS} from "../utils/config";

const TableComponent: React.FC = () => {
    const {state, setInputValue} = useExcel();
    const tableData = state.data;

    return (
        <Grid container columnSpacing={0} rowSpacing={0} maxWidth="xl">
            {/*table start*/}
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <TableContainer component={Paper} style={{maxHeight: '100%', maxWidth: '100%', width: '100%'}}>
                    <Table stickyHeader aria-label="table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell width="15%" align="center"/>
                                {PERIODS.map((value, idx) => (
                                    <TableCell key={idx} align="center">{value}</TableCell>
                                ))
                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(tableData).map(([org, orgData], index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': {},
                                    }}
                                >
                                    <TableCell align="center" sx={{width: '18%'}}>{org}</TableCell>
                                    {PERIODS.map(period => {
                                        let periodValue = orgData[period];
                                        return (
                                            <TableCell sx={{fontWeight: 'bold'}} align="center">
                                                {periodValue === null || isNaN(periodValue) ? '-' : `${Math.round(periodValue)} р.`}
                                            </TableCell>
                                        );
                                    })}

                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={PERIODS.length + 1}/>
                            </TableRow>
                            <TableRow sx={{
                                backgroundColor: '#bfbfbf',
                            }}>
                                <TableCell align="center" sx={{width: '18%', fontWeight: 'bold'}}>Средний
                                    платеж</TableCell>
                                {PERIODS.map(period => {
                                    let averageValue = state.averagePayment[period]
                                    return (
                                        <TableCell sx={{fontWeight: 'bold'}} align="center">
                                            {averageValue === null || isNaN(averageValue) ? '-' : `${averageValue.toFixed(1)} р.`}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={1}/>
            {/*table end*/}

            {/*Inputs*/}
            <Grid item xs={7}/>
            <Grid item xs={1}>
                <NumberInput
                    label="Цена"
                    onInputChange={setInputValue}
                />
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}>
                <TextField
                    label="Цена продажи"
                    value={isNaN(state.targetPrice) ? '-' : state.targetPrice}
                    defaultValue='-'
                    // disabled
                    fullWidth
                    variant="standard"
                    style={{marginTop: '20px'}}
                    InputLabelProps={{shrink: true}}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item xs={2}/>
            {/*Inputs*/}
        </Grid>
    );
};

export default TableComponent;
