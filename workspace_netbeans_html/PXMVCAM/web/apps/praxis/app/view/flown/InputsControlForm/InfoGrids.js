/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.InputsControlForm.InfoGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-infoGrids',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;',
    items: [
        {
            region: 'center',
            bodyStyle: 'background-color: #E3EAEF;',
            border:false,
            layout: {
                type: 'vbox',
                align: 'center'
                
            },
            items: [
                /*
                 *          MAIN-A1686
                 ***/
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataMainA1686',
                    bodyStyle: 'background-color: #E3EAEF;',
                    height: 550,
                    hidden: false,
                    width: 1052,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Seq', width: 60, dataIndex: 'RN'},
                            {text: 'Processing',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: false
                                },
                                columns: [
                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate'},
                                    {text: 'Time', width: 80, dataIndex: 'HOCR'}

                                ]
                            },
                            {text: 'User <br> Create', width: 100, dataIndex: 'USCR'},
                            {text: 'Generation <br> Date', width: 100, dataIndex: 'strFormatDate4',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                    return '<a href="#flown-inputs-control-form" style="color:#008FE3">' + value + '</a>';
                                }
                                ,
                                listeners: {
                                    click: 'setGridProcDateData'
                                }

                            },
                            {text: 'Source', width: 80, dataIndex: 'FUENTE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                    return '<a href="#flown-inputs-control-form" style="color:#008FE3">' + value + '</a>';
                                }
                                ,
                                listeners: {
                                    click: 'setGridDataA1686Formateados'
                                }
                            },
                            {text: 'Total Records',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'right',
                                    border: true
                                },
                                columns: [
                                    {text: 'Received', width: 80, dataIndex: 'QRECOR',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }},
                                    {text: 'Loaded', width: 80, dataIndex: 'QRECORG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }},
                                    {text: 'Error', width: 80, dataIndex: 'QRECERR', id: prototype.id + '-errorMain',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }}
                                ]
                            },
                            {text: 'Details/Error Message', width: 300, align: 'left', dataIndex: 'MENSA'}
                        ]
                    }
                },
                /**
                 *      A1686 FORMATEADOS
                 * */
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataA1686Formateados',
                    bodyStyle: 'background-color: #E3EAEF;',
                    labelAlign: 'left',
                    height: 550,
                    width: 962,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Formating',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate'},
                                    {text: 'Time', width: 80, dataIndex: 'HOCR'}

                                ]
                            },
                            {text: 'User ', width: 100, dataIndex: 'USCR'},
                            {text: 'Date <br> Flight', width: 100, dataIndex: 'DPRDA'},
//                            {text: 'SSIM <br> Loaded', width: 80, dataIndex: 'QRECORG2'},
                            {text: 'Total Records',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'right',
                                    border: true
                                },
                                columns: [
                                    {text: 'Received', width: 80, dataIndex: 'QRECOR',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }},
                                    {text: 'Loaded', width: 80, dataIndex: 'QRECORG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }},
                                    {text: 'Error', width: 80, dataIndex: 'QRECERR',id: prototype.id + '-id_error',
                                        
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var src = Ext.getCmp(prototype.id + '-cmbSource').getValue();
                                            if(src === 'ODS' || src === 'SSIM' || src === 'EMD'){
                                                return  value;
                                            }else {
                                                metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                                return  '<a href="#flown-inputs-control-form" style="color:#008FE3">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                            }
                                        },
                                        listeners: {
                                            click: 'setErrores'
                                        }
                                    }
                                ]
                            },
                            {text: 'Details/Error Message', width: 300, dataIndex: 'MENSA'}
                        ]
                    }
                },
                /**
                 *      A1696 FORMATEADOS - ERORRES
                 * */
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataErrorVCRJ',
                    bodyStyle: 'background-color: #E3EAEF;',
                    labelAlign: 'left',
                    height: 550,
                    width: 960,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'A1413DATE ', width: 100, dataIndex: 'A1413DATE'},
                            {text: 'A1413SEC ', width: 100, dataIndex: 'A1413SEC'},
                            {text: 'Details Data', width: 600, align: 'left', dataIndex: 'A1413DATA'},
                            {text: 'Cia', width: 100, dataIndex: 'A1413CIA'},
                            {text: 'A1413FORSE', width: 100, dataIndex: 'A1413FORSE'},
                            {text: 'Cupon', width: 100, dataIndex: 'A1413CUPON'},
                            {text: 'From', width: 100, dataIndex: 'A1413FROM'},
                            {text: 'To', width: 100, dataIndex: 'A1413TO'},
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataA1696Errores',
                    bodyStyle: 'background-color: #E3EAEF;',
                    labelAlign: 'left',
                    height: 550,
                    width: 992,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Create',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Date', width: 100, dataIndex: 'strFormatDate4'},
                                    {text: 'Time', width: 90, dataIndex: 'HOCR'}

                                ]
                            },
                            {text: 'Source ', width: 100, dataIndex: 'FUENTE'},
                            {text: 'Details / Error Message', width: 642, dataIndex: 'MENSA'}

                        ]
                    }
                },
                /**
                 *      A1686 PROC DATE DATA
                 * */

                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridProcDateData',
                    layout: 'vbox',
                    border: false,
                    pack: 'center',
                    bodyStyle: 'background-color: #E3EAEF;',
                    items: [
                        {
                            xtype: 'label',
                            id: prototype.id + '-titleProcDate',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            margin: '10 5 10 250'
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridProcDateData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 550,
                            width: 722,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Seq', width: 60, dataIndex: 'RN'},
                                    {text: 'Source', width: 120, dataIndex: 'FUENTE'},
                                    {text: 'Flight <br> Date', id: prototype.id + '-flightDate', width: 120, dataIndex: 'strFormatDate3',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                            return '<a href="#flown-inputs-control-form" style="color:#008FE3">' + value + '</a>';
                                        }
                                        ,
                                        listeners: {
                                            click: 'setGridDataByFlightDate'
                                        }
                                    },
                                    {text: 'Total Records <br> Loader', width: 120, dataIndex: 'QRECORG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-left : 1px ";
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'Loading Information',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'User', width: 110, dataIndex: 'USCR'},
                                            {text: 'Date', width: 110, dataIndex: 'strFormatDate'},
                                            {text: 'Time', width: 80, dataIndex: 'HOCR'}
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                /**
                 *     PROC DATE DATA  - SSIM -  A1687 DATA
                 * */

                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridDataA1687',
                    layout: 'vbox',
                    border: false,
                    pack: 'center',
                    bodyStyle: 'background-color: #E3EAEF;',
                    items: [
                        {
                            xtype: 'label',
                            id: prototype.id + '-titleA1687',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            margin: '10 5 10 500'
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataA1687',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 515,
                            width: 1118,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Nbr', width: 35, dataIndex: 'Nbr'},
                                    {text: 'Processing <br> Date', width: 90, dataIndex: 'strFormatDate'},
                                    {text: 'Transaction <br> Number', width: 100, dataIndex: 'TRNN'},
                                    {text: 'Processing <br> Time', width: 90, dataIndex: 'TTIME'},
                                    {text: 'SSIM Information', width: 800, dataIndex: 'SSIMDATA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 1px ";
                                            return value;
                                        }}
                                ]
                            }
                        }
                    ]
                },
                /**
                 *     PROC DATE DATA  - ODS -  A1688 DATA
                 * */

                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridDataA1688',
                    layout: 'vbox',
                    border: false,
                    pack: 'center',
                    bodyStyle: 'background-color: #E3EAEF;',
                    items: [
                        {
                            xtype: 'label',
                            id: prototype.id + '-titleA1688',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            margin: '10 5 10 500'
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataA1688',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 515,
                            width: 1035,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Nbr', width: 35, dataIndex: 'Nbr'},
                                    {text: 'ODS Information', width: 1000, dataIndex: 'FFLOW',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 1px ";
                                            return value;
                                        }}
                                ]
                            }
                        }
                    ]
                }, /**
                 *     PROC DATE DATA  - EMD -  A1689 DATA
                 * */

                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridDataA1689',
                    layout: 'vbox',
                    border: false,
                    pack: 'center',
                    bodyStyle: 'background-color: #E3EAEF;',
                    items: [
                        {
                            xtype: 'label',
                            id: prototype.id + '-titleA1689',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            margin: '10 5 10 500'
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataA1689',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 515,
                            width: 1118,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Nbr', width: 35, dataIndex: 'RN'},
                                    {text: 'Flight <br> Date', width: 90, dataIndex: 'strFormatDate'},
                                    {text: 'Transaction <br> Number', width: 100, dataIndex: 'TRNN'},
                                    {text: 'CIA ', width: 90, dataIndex: 'CCIA'},
                                    {text: 'EMD Information', width: 800, dataIndex: 'EMDDATA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 1px ";
                                            return value;
                                        }}
                                ]
                            }
                        }
                    ]
                },
                /**
                 *     PROC DATE DATA  - vcr -  A1413 DATA
                 * */

                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridDataA1413',
                    layout: 'vbox',
                    border: false,
                    pack: 'center',
                    bodyStyle: 'background-color: #E3EAEF;',
                    items: [
                        {
                            xtype: 'label',
                            id: prototype.id + '-titleA1413',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            margin: '10 5 10 300'
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataA1413',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 515,
                            width: 838,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Nbr', width: 35, dataIndex: 'RN'},
                                    {text: 'VCR Information', width: 800, dataIndex: 'EMDDATA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 1px ";
                                            return value;
                                        }}
                                ]
                            }
                        }
                    ]
                },
                /**
                 *     PROC DATE DATA  - ISR -  A1419 DATA
                 * */

                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridDataA1419',
                    layout: 'vbox',
                    border: false,
                    pack: 'center',
                    bodyStyle: 'background-color: #E3EAEF;',
                    items: [
                        {
                            xtype: 'label',
                            id: prototype.id + '-titleA1419',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            margin: '10 5 10 500'
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataA1419',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 515,
                            width: 1065,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Nbr', width: 45, dataIndex: 'Nbr'},
                                    {text: 'Ticket', width: 120, dataIndex: 'TDNR'},
                                    {text: 'ISR Information', width: 900, dataIndex: 'TCNMAXLONG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 1px ";
                                            return value;
                                        }}
                                ]
                            }
                        }
                    ]
                },
                /**
                 *      MAIN DATA OCR  1690
                 * */
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridMainDataOCR',
                    bodyStyle: 'background-color: #E3EAEF;',
                    labelAlign: 'left',
                    height: 550,
                    width: 363,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Seq', width: 60, dataIndex: 'RN'},
                            {text: 'Processing <br> Date ', width: 100, dataIndex: 'strFormatDate',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                    return  '<a href="#flown-inputs-control-form" style="color:#008FE3">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'setGridDataA1690'
                                }
                            },
                            {text: 'Source ', width: 100, dataIndex: 'FUENTE'},
                            {text: 'Loaded ', width: 100, dataIndex: 'QRECOR'}


                        ]
                    }
                },
                 /**
                 *     GRID  1690
                 * */
                
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelGridDataA1690',
                    layout: 'vbox',
                    border: false,
                    pack: 'center',
                    bodyStyle: 'background-color: #E3EAEF;',
                    items: [
                        {
                            xtype: 'label',
                            id: prototype.id + '-titleA1690',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            margin: '10 5 10 180'
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataA1690',
                            bodyStyle: 'background-color: #E3EAEF;',
                            height: 520,
                            width: 564,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: '',
                                        id: prototype.id + '-gridDataA1690-header',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Nbr', width: 50, dataIndex: 'RN'},
                                            {text: 'Ticket', width: 140, dataIndex: 'strTicket'},
//                                            {text: 'Flight Date <br> Control', width: 100, dataIndex: 'strFormatDate'},
                                            {text: 'Flight Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Number', width: 80, dataIndex: 'NFLIGHT'},
                                                    {text: 'Orig', width: 80, dataIndex: 'CDEPART'},
                                                    {text: 'Dest', width: 100, dataIndex: 'CARRIVA'},
                                                    {text: 'Date', width: 100, dataIndex: 'strFormatDate2'}

                                                ]
                                            }

                                        ]
                                    },
//                                    {text: '',
//                                        id: prototype.id + '-gridDataA1690-header2',
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: true,
//                                            align: 'center',
//                                            border: true
//                                        },
//                                        columns: [
//                                            {text: 'Flag', width: 50, dataIndex: 'FLAG'},
//                                            {text: 'Prorate Nbr', width: 140, dataIndex: 'NROPRT'},
//                                            {text: 'Grupo', width: 100, dataIndex: 'GRUPO'}
//
//                                        ]
//                                    }
                                ]
                            }
                        }
                    ]
                },
                /*
                 *          MAIN - EMD DELTA 
                 ***/

                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataMainEMDDelta',
                    bodyStyle: 'background-color: #E3EAEF;',
                    height: 550,
                    hidden: false,
                    width: 1042,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Seq', width: 60, dataIndex: 'RN'},
                            {text: 'Processing',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate'},
                                    {text: 'Time', width: 80, dataIndex: 'HOCR'}
                                ]
                            },
                            {text: 'User <br> Create', width: 100, dataIndex: 'USCR'},
                            {text: 'Generation <br> Date', width: 100, dataIndex: 'strFormatDate4'},
                            {text: 'Source', width: 80, dataIndex: 'FUENTE'},
                            {text: 'Total Records',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'right',
                                    border: true
                                },
                                columns: [
                                    {text: 'Received', width: 80, dataIndex: 'QRECOR',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                            return '<a href="#flown-inputs-control-form" style="color:#008FE3">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        }
                                        ,
                                        listeners: {
                                            click: 'setGridDataA2735'
                                        }},
                                    {text: 'Loaded', width: 80, dataIndex: 'QRECORG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                            return '<a href="#flown-inputs-control-form" style="color:#008FE3">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        }
                                        ,
                                        listeners: {
                                            click: 'setGridDataA2735'
                                        }},
                                    {text: 'Error', width: 80, dataIndex: 'QRECERR',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-decoration:underline; color:#008FE3; ';
                                            return '<a href="#flown-inputs-control-form" style="color:#008FE3">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        }
                                        ,
                                        listeners: {
                                            click: 'setGridDataA2735'
                                        }}
                                ]
                            },
                            {text: 'Details/Error Message', width: 300, dataIndex: 'MENSA'}
                        ]
                    }
                },
                /**
                 *     EMD DELTA  -  A2735 DATA
                 * */

                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataA2735',
                    bodyStyle: 'background-color: #E3EAEF;',
                    height: 515,
                    width: 1040,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 35, dataIndex: 'Nbr'},
                            {text: 'EMD Delta  Information', width: 1000, dataIndex: 'FFLOW',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :left ; margin-left : 1px ";
                                    return value;
                                }}
                        ]
                    }

                },
                  /*
                 *          MAIN-A1686 IDEC
                 ***/

                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataMainA1686IDEC',
                    bodyStyle: 'background-color: #E3EAEF;',
                    height: 550,
                    hidden: false,
                    width: 1042,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Seq', width: 60, dataIndex: 'RN'},
                            {text: 'Processing',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate'},
                                    {text: 'Time', width: 80, dataIndex: 'HOCR'}

                                ]
                            },
                            {text: 'User <br> Create', width: 100, dataIndex: 'USCR'},
                            {text: 'Generation <br> Date', width: 100, dataIndex: 'strFormatDate4'},
                            {text: 'Source', width: 80, dataIndex: 'FUENTE'},
                            {text: 'Total Records',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'right',
                                    border: true
                                },
                                columns: [
                                    {text: 'Received', width: 80, dataIndex: 'QRECOR',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }},
                                    {text: 'Loaded', width: 80, dataIndex: 'QRECORG',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }},
                                    {text: 'Error', width: 80, dataIndex: 'QRECERR',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }}
                                ]
                            },
                            {text: 'Details/Error Message', width: 300, dataIndex: 'MENSA'}
                        ]
                    }
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 800,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                },
                
                // -----------------------------------------------------------------------------
                
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataLOG',
                    bodyStyle: 'background-color: #E3EAEF;',
                    labelAlign: 'left',
                    height: 550,
                    width: 1300,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
//                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Description', width: 300, dataIndex: 'strFormatDate2',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:left;";
                                    metaData.tdAttr = 'data-qtip="' + data.strFormatDate2+'"';
                                    return  value;
                                }
                            },
                            {text: 'Program',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Name', width: 80, dataIndex: 'FUENTE',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            metaData.tdAttr = 'data-qtip="' + data.FUENTE+'"';
                                            return  value;
                                        }
                                    }

                                ]
                            },
                            {text: 'Status ', width: 50, dataIndex: 'STVAL'},
                            {text: 'Read ', width: 60, dataIndex: 'QRECOR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                    return Ext.util.Format.number(value, '0,000');
                                }
                            },
                            {text: 'Write ', width: 60, dataIndex: 'QRECORG',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                    return Ext.util.Format.number(value, '0,000');
                                }
                            },
                            {text: 'Create',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'User', width: 80, dataIndex: 'USCR'},
                                    {text: 'Date', width: 80, dataIndex: 'FECR'}

                                ]
                            },
                            {text: 'Time',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Start', width: 80, dataIndex: 'HOCR'},
                                    {text: 'End', width: 80, dataIndex: 'strFormatDate'},
                                    {text: 'Diff', width: 80, dataIndex: 'strFormatDate4'}

                                ]
                            },
                            {text: 'Message', width: 350, dataIndex: 'MENSA',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:left;";
                                    metaData.tdAttr = 'data-qtip="' + data.MENSA+'"';
                                    return  value;
                                }
                            }
                        ]
                    }
                }
            ]
        }

    ]
}
);

