import React, { useState } from 'react';
import { useExcel } from '../contexts/useExcel';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Typography } from '@mui/material';
import NumberInput from './NumberInput';
import { PERIODS } from "../utils/config";
import { calculateTargetPrice } from '../utils/utils'; 
import { ORG_CONFIG, ORGANIZATION, PERIOD } from '../utils/config';

const TableComponent: React.FC = () => {
    const { state, setInputValue } = useExcel();
    const tableData = state.data;

    const [products, setProducts] = useState<{ price: number, targetPrice: number }[]>([]);

    const addProduct = () => {
        if (products.length < 7) {
            setProducts([...products, { price: 0, targetPrice: 0 }]);
        }
    };

    const removeProduct = () => {
        if (products.length > 0) {
            setProducts(products.slice(0, -1));
        }
    };

    const handlePriceChange = (index: number, value: number) => {
        const newProducts = [...products];
        newProducts[index].price = value;

        const targetPrice = calculateTargetPrice(value);
        newProducts[index].targetPrice = targetPrice;

        setProducts(newProducts);
        setInputValue(value || 0);
    };

    const getTotalTargetPrice = () => {
        return products.reduce((total, product) => total + (product.targetPrice || 0), 0);
    };

    const calculateOrganizationPayments = () => {
        const totalPayments: { [org in ORGANIZATION]: { [period in PERIOD]: number | null } } = {} as any;
        const totalTargetPrice = getTotalTargetPrice();

        for (let org in tableData) {
            totalPayments[org as ORGANIZATION] = {} as { [period in PERIOD]: number | null };
            for (let period of PERIODS) {
                const orgConfigValue = ORG_CONFIG[org as ORGANIZATION]?.[period] || 0;
                totalPayments[org as ORGANIZATION][period] = totalTargetPrice * orgConfigValue;
            }
        }

        return totalPayments;
    };

    const totalTargetPrice = getTotalTargetPrice();
    const organizationPayments = calculateOrganizationPayments();

    return (
        <Grid container columnSpacing={0} rowSpacing={0} maxWidth="xl">
            <Grid item xs={1} />
            <Grid item xs={10}>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell width="15%" align="center" />
                                {PERIODS.map((value, idx) => (
                                    <TableCell key={idx} align="center">{value}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(tableData).map(([org, orgData], index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" sx={{ width: '18%' }}>{org}</TableCell>
                                    {PERIODS.map(period => {
                                        let periodValue = organizationPayments[org as ORGANIZATION]?.[period] || 0;
                                        return (
                                            <TableCell sx={{ fontWeight: 'bold' }} align="center" key={period}>
                                                {periodValue === null || isNaN(periodValue) ? '-' : `${Math.round(periodValue)} р.`}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                            <TableRow style={{ backgroundColor: 'grey' }}>
                                <TableCell align="center"  sx={{ fontWeight: 'bold' }}>Средний платеж</TableCell>
                                {PERIODS.map(period => {
                                    let totalPaymentForPeriod = Object.entries(tableData).reduce((sum, [org]) => {
                                        const orgConfigValue = ORG_CONFIG[org as ORGANIZATION]?.[period] || null;
                                        if (orgConfigValue !== null) {
                                            return sum + (totalTargetPrice * orgConfigValue);
                                        }
                                        return sum;
                                    }, 0);

                                    const organizationsWithData = Object.entries(tableData).filter(([org]) => ORG_CONFIG[org as ORGANIZATION]?.[period] !== null).length;
                                    let averageValue = organizationsWithData > 0 ? totalPaymentForPeriod / organizationsWithData : 0;

                                    return (
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center" key={period}>
                                            {isNaN(averageValue) || averageValue === 0 ? '-' : `${averageValue.toFixed(1)} р.`}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Typography variant="h6">Общая сумма: {totalTargetPrice.toFixed(2)} р.</Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {products.map((product, index) => (
                        <Grid item xs={2} key={index}>
                            <NumberInput
                                label={`Цена ${index + 1}`}
                                onInputChange={(value) => handlePriceChange(index, value)}
                            />
                            <TextField
                                label={`Цена продажи ${index + 1}`}
                                value={product.targetPrice || '-'}
                                fullWidth
                                variant="standard"
                                style={{ marginTop: '10px' }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" onClick={addProduct} style={{ marginTop: '20px', marginRight: '10px' }} disabled={products.length >= 7}>
                    +
                </Button>
                <Button variant="contained" color="secondary" onClick={removeProduct} style={{ marginTop: '20px' }} disabled={products.length === 0}>
                    -
                </Button>
            </Grid>
        </Grid>
    );
};

export default TableComponent;
