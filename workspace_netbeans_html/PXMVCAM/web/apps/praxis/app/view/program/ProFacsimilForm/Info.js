Ext.define('Ext.Praxis.view.program.ProFacsimilForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.Facsimil.id+'-Info',
    layout: 'border',
    align: 'center',
    defaults: {
    },
    items: [
        {
            region: 'center',
            id: prototype.Facsimil.id+'-boxConsultas',
            border: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            padding: '3 0 0 0',
            defaults: {
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: 1040,
                            layout: 'vbox',
                            defaults: {
                                xtype: 'panel',
                                width: '100%',
                                border: false
                            },
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'background-color: #CADAE4;',
                                    defaults: {
                                        xtype: 'panel',
                                        border: true,
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: '7%'},
                                        {
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                border: false,
                                                bodyStyle: 'background-color: transparent;'
                                            },
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                                {
                                                    defaults: {
                                                        xtype: 'panel',
                                                        border: true,
                                                        layout: 'hbox',
                                                        bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;'
                                                    },
                                                    items: [
                                                        {
                                                            width: 167,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '3%'},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.Facsimil.id+'-lblFUENTE2',
                                                                    style: 'text-align:left;',
                                                                    html: '&nbsp',
                                                                    width: '97%',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 143,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Ticket Image',
                                                                    style: 'text-align:center;',
                                                                    width: '100%',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 165,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '10%'},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtTicket',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '80%'
                                                                },
                                                                {xtype: 'tbspacer', width: '10%'}
                                                            ]
                                                        },
                                                        {
                                                            width: 250,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'PERIOD:',
                                                                    style: 'text-align:left;',
                                                                    width: '54%',
                                                                    padding: '4 0 4 3%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtPeriod',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '40%'
                                                                    
                                                                },
                                                                {xtype: 'tbspacer', width: '3%'}
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                                {
                                                    defaults: {
                                                        xtype: 'panel',
                                                        border: true,
                                                        layout: 'hbox',
                                                        bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;'
                                                    },
                                                    items: [
                                                        {
                                                            width: 475,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '1%'},
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:left;',
                                                                    text: 'ISSUED BY:',
                                                                    padding: '5 0'
                                                                },
                                                                {xtype: 'tbspacer', width: 3},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.Facsimil.id+'-lblNomAer',
                                                                    style: 'text-align:left;',
                                                                    text: 'AEROMEXICO',
                                                                    width: 300,
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 250,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'PASSENGER TICKET AND BAGGAGE CHECKED',
                                                                    style: 'text-align:left;',
                                                                    width: '100%',
                                                                    padding: '5 0 5 3%'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                                {
                                                    defaults: {
                                                        xtype: 'panel',
                                                        border: true,
                                                        layout: 'hbox',
                                                        bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;'
                                                    },
                                                    items: [
                                                        {
                                                            width: 475,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '1%'},
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:left;',
                                                                    text: 'CONJUNTION TICKETS',
                                                                    width: '25%',
                                                                    padding: '5 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtConj',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '60%'
                                                                },
                                                                {xtype: 'tbspacer', width: '3%'},
                                                                {
                                                                    xtype: 'button',
                                                                    id:prototype.Facsimil.id+'-imgPrev',
                                                                    icon: 'resources/img/botones/prev.png',
                                                                    tooltip: 'Conj - Prev',
                                                                    border: false,
                                                                    listeners:{
                                                                        click: 'imgPrev_clickHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id:prototype.Facsimil.id+'-imgNext',
                                                                    icon: 'resources/img/botones/next2.png',
                                                                    tooltip: 'Conj - Next',
                                                                    border: false,
                                                                    listeners:{
                                                                        click: 'imgNext_clickHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 250,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'ORIGIN/DESTINATION',
                                                                    style: 'text-align:left;',
                                                                    width: '52%',
                                                                    padding: '5 0 5 3%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtOrigDest',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '40%'
                                                                },
                                                                {xtype: 'tbspacer', width: '5%'}
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                                {
                                                    defaults: {
                                                        xtype: 'panel',
                                                        border: true,
                                                        layout: 'hbox',
                                                        bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;'
                                                    },
                                                    items: [
                                                        {
                                                            width: 310,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '1%'},
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:left;',
                                                                    text: 'ENDORSEMENTS/RESTRICTIONS',
                                                                    width: '98%',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 165,
                                                            items: [
                                                                {xtype: 'tbspacer', width: 4},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.Facsimil.id+'-lblFuente',
                                                                    style: 'text-align:left;',
                                                                    html: '&nbsp',
                                                                    width: 40,
                                                                    padding: '5 0'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:left;',
                                                                    text: ' / ',
                                                                    width: 20,
                                                                    padding: '5 0'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.Facsimil.id+'-lblPais',
                                                                    style: 'text-align:left;',
                                                                    html: '&nbsp',
                                                                    width: 40,
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 250,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'BOOKING REF.',
                                                                    style: 'text-align:left;',
                                                                    width: '40%',
                                                                    padding: '4 0 4 3%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtBookRef',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '52%'
                                                                    
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                                {
                                                    defaults: {
                                                        xtype: 'panel',
                                                        border: true,
                                                        layout: 'hbox',
                                                        bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;'
                                                    },
                                                    items: [
                                                        {
                                                            width: 310,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtEndors',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '90%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 165,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    html: '&nbsp',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 250,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'TOUR CODE',
                                                                    style: 'text-align:left;',
                                                                    width: '40%',
                                                                    padding: '4 0 4 3%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtTourC',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '52%'
                                                                    
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 6">
                                                {
                                                    defaults: {
                                                        xtype: 'panel',
                                                        border: true,
                                                        layout: 'hbox',
                                                        bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;'
                                                    },
                                                    items: [
                                                        {
                                                            width: 310,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '1%'},
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:left;',
                                                                    text: 'PASSENGER NAME NOT TRANSFERABLE',
                                                                    width: '98%',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 165,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;',
                                                                    text: 'DATE OF ISSUE',
                                                                    width: '100%',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 250,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '1%'},
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:left;',
                                                                    text: 'ISSUE IN EXCHANGE FOR',
                                                                    width: '98%',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 7">
                                                {
                                                    defaults: {
                                                        xtype: 'panel',
                                                        border: true,
                                                        layout: 'hbox',
                                                        bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;'
                                                    },
                                                    items: [
                                                        {
                                                            width: 310,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtPassenger',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '90%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            width: 165,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '25%'},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtDateIssue',
                                                                    fieldStyle: 'text-align:center;font-size:10px;color:#244066;',
                                                                    width: '50%'
                                                                },
                                                                {xtype: 'tbspacer', width: '25%'}
                                                            ]
                                                        },
                                                        {
                                                            width: 250,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtIssExc',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '90%'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            width: '18%',
                                            height: '100%',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            bodyStyle: "background-image:url(resources/img/marca.png) !important;background-repeat: no-repeat;background-position: center;border-style:solid;border-color:#B7BABC;border-width:1px;",
                                            defaults: {
                                            },
                                            items: [
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.Facsimil.id+'-lblNomAgente',
                                                    inputWrapCls: '',//quitar border
                                                    value: "",
                                                    readOnly: true,
                                                    fieldStyle: 'text-align:center;font-size:10px;color:#244066;background-color:transparent;',
                                                    width: '95%',
                                                    height: 55
                                                },
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.Facsimil.id+'-lblDirAgente',
                                                    inputWrapCls: '',
                                                    value: "",
                                                    readOnly: true,
                                                    fieldStyle: 'text-align:center;font-size:10px;color:#244066;background-color:transparent;',
                                                    width: '95%',
                                                    height: 70
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.Facsimil.id+'-lblAgente',
                                                    style: 'text-align:center;font-weight:bold;font-size:12px;color:#244066;background-color:transparent;',
                                                    text: '',
                                                    width: '95%'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: '10%'}
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    defaults: {
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 50},
                                        //<editor-fold defaultstate="collapsed" desc="button">
                                        {
                                            xtype: 'button',
                                            id:prototype.Facsimil.id+'-btnMasterIndex',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">Master Index</strong>',
                                            border: true,
                                            scale: 'small',
                                            margin: '2 0',
                                            width: 115,
                                            listeners:{
                                                click: 'btnMasterIndex_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'button',
                                            id:prototype.Facsimil.id+'-btnAccounting',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">Accounting</strong>',
                                            border: true,
                                            scale: 'small',
                                            margin: '2 0',
                                            width: 115,
                                            listeners:{
                                                click: 'btnAccounting_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            padding: '0',
                                            margin: '0',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.Facsimil.id+'-imgBack',
                                                    iconCls: 'prx-icon-back',
                                                    tooltip: 'Back',
                                                    listeners: {
                                                        click: 'imgBack_clickHandler'
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                {
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: #CADAE4;',
                                    defaults: {
                                        xtype: 'panel',
                                        border: true,
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', height: 7},
                                        // <editor-fold defaultstate="collapsed" desc="gridDetFac">
                                        {
                                            xtype: 'grid',
                                            id: prototype.Facsimil.id+'-gridDetFac',
                                            width: '100%',
                                            height: 118,
                                            padding: '0 1',
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'X/O', dataIndex: 'STPO', width: 33
                                                    },
                                                    {
                                                        text: 'FROM', dataIndex: 'ORAC', width: 47,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.RESD1 === 'SURFACE') ? '#0D8231' : '#2b4d72';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:9;font-weight:normal;";
                                                            metaData.tdAttr = 'data-qtip="'+data.strDescFrom+'"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'TO', dataIndex: 'DSTC', width: 31,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.RESD1 === 'SURFACE') ? '#0D8231' : '#2b4d72';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:9;font-weight:normal;";
                                                            metaData.tdAttr = 'data-qtip="'+data.strDescTo+'"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'CARRIER', dataIndex: 'CARR', width: 66,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.RESD1 === 'SURFACE') ? '#0D8231' : '#2b4d72';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:9;font-weight:normal;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'FLIGHT', dataIndex: 'FTNR', width: 57
                                                    },
                                                    {
                                                        text: 'CL', dataIndex: 'RBKD', width: 30
                                                    },
                                                    {
                                                        text: 'DATE', dataIndex: 'FTDA', width: 50
                                                    },
                                                    {
                                                        text: 'TIME', dataIndex: 'FTDT', width: 45
                                                    },
                                                    {
                                                        text: 'ST', dataIndex: 'FBST', width: 28
                                                    },
                                                    {
                                                        text: 'FARE BASIS', dataIndex: 'FBTD', width: 83
                                                    },
                                                    {
                                                        text: 'N.VALID B', dataIndex: 'NBDA', width: 70
                                                    },
                                                    {
                                                        text: 'N.VALID A', dataIndex: 'NADA', width: 70
                                                    },
                                                    {
                                                        text: 'USE', dataIndex: 'strUso', width: 37,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#bcdcf8;font-size:9;font-weight:normal;";
                                                            metaData.tdAttr = 'data-qtip="'+data.strDesUso+'"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'DATE', dataIndex: 'strFecUso', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#bcdcf8;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VALUE', dataIndex: 'dblMontoUso', width: 58,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#bcdcf8;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'LEG', dataIndex: 'strLeg', width: 40,
                                                        listeners: {
                                                            click: 'viewLeg'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                            metaData.tdAttr = 'data-qtip="View Leg"';
                                                            return '<a href="#program-pro-facsimil-form" style="color:#057ECB;text-decoration:none;">'+value+'</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'DATE', dataIndex: 'FCONT', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#bcdcf8;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'ID', dataIndex: 'IDCON', flex: 1,//width: 210,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#bcdcf8;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 7}
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'background-color: #CADAE4;',
                                    defaults: {
                                        xtype: 'panel',
                                        border: true,
                                        bodyStyle: 'background-color: transparent;'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 34},
                                        //<editor-fold defaultstate="collapsed" desc="Panel 1">
                                        {
                                            layout: 'vbox',
                                            defaults: {
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;',
                                                    width: 190,
                                                    items: [
                                                        {xtype: 'tbspacer', width: '1%'},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;',
                                                            text: 'FARE',
                                                            width: '24%',
                                                            padding: '5 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtFareCurr',
                                                            fieldStyle: 'text-align:right;font-size:10px;color:#244066;',
                                                            width: '20%'
                                                        },
                                                        {xtype: 'tbspacer', width: '5%'},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtFare',
                                                            fieldStyle: 'text-align:right;font-size:10px;color:#244066;',
                                                            width: '49%'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;',
                                                    width: 190,
                                                    items: [
                                                        {xtype: 'tbspacer', width: '1%'},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;',
                                                            text: 'EQUIV',
                                                            width: '24%',
                                                            padding: '5 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtEquivFaCurr',
                                                            fieldStyle: 'text-align:right;font-size:10px;color:#244066;',
                                                            width: '20%'
                                                        },
                                                        {xtype: 'tbspacer', width: '5%'},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtEquivFa',
                                                            fieldStyle: 'text-align:right;font-size:10px;color:#244066;',
                                                            width: '49%'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;',
                                                    width: 190,
                                                    items: [
                                                        {xtype: 'tbspacer', width: '1%'},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;',
                                                            text: 'Taxes',
                                                            width: '24%',
                                                            padding: '5 0'
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            id: prototype.Facsimil.id+'-txtTaxes',
                                                            value: "",
                                                            fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                            width: '74%',
                                                            height: 52
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;',
                                                    width: 190,
                                                    items: [
                                                        {xtype: 'tbspacer', width: '1%'},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;',
                                                            text: 'TOTAL',
                                                            width: '24%',
                                                            padding: '5 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtTotalCurr',
                                                            fieldStyle: 'text-align:right;font-size:10px;color:#244066;',
                                                            width: '20%'
                                                        },
                                                        {xtype: 'tbspacer', width: '5%'},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtTotal',
                                                            fieldStyle: 'text-align:right;font-size:10px;color:#244066;',
                                                            width: '49%'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;',
                                                    width: 190,
                                                    items: [
                                                        {xtype: 'tbspacer', width: '1%'},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;',
                                                            text: 'A/L AGENT INFO',
                                                            width: '99%',
                                                            padding: '5 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;border-left-width:1px;',
                                                    width: 190,
                                                    items: [
                                                        {xtype: 'tbspacer', width: '1%'},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;',
                                                            text: 'CIF',
                                                            width: '99%',
                                                            padding: '5 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="Panel 2">
                                        {
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                border: false,
                                                bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;'
                                            },
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            defaults: {
                                                                width: 90
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'text-align:center;',
                                                                            text: 'Fare COBL',
                                                                            width: '100%',
                                                                            padding: '4 0 5 0'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'center'
                                                                    },
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.Facsimil.id+'-txtCOBL',
                                                                            fieldStyle: 'text-align:right;font-size:10px;color:#244066;',
                                                                            width: '92%',
                                                                            padding: '0 7% 12 7%'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            layout: 'hbox',
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            height: '100%',
                                                            width: 570,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'FARE CALCULATION',
                                                                    style: 'text-align:center;',
                                                                    width: '23%'
                                                                },
                                                                {
                                                                    xtype: 'textarea',
                                                                    id: prototype.Facsimil.id+'-txtFareCal',
                                                                    value: "",
                                                                    fieldStyle: 'text-align:left;color:#244066;',
                                                                    width: '77%',
                                                                    height: '100%'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            layout: 'hbox',
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 590,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'FORM OF PAYMENT',
                                                                    width: '20%',
                                                                    style: 'text-align: center;',
                                                                    padding: '5 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtFormPay',
                                                                    fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                    width: '80%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            layout: 'hbox',
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 70,
                                                            items: [
                                                                {xtype: 'tbspacer', width: '2%'},
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:left;',
                                                                    text: 'APP',
                                                                    width: '98%',
                                                                    padding: '5 0'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            layout: 'hbox',
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 450,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'AIR',
                                                                    width: '10%',
                                                                    style: 'text-align: center;',
                                                                    padding: '9 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtCIA',
                                                                    value: "",
                                                                    fieldStyle: 'text-align:center;font-size:10px;color:#244066;',
                                                                    width: '15%',
                                                                    padding: '7 0'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'FORM & SERIAL',
                                                                    width: '20%',
                                                                    style: 'text-align: center;',
                                                                    padding: '9 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtFS',
                                                                    value: "",
                                                                    fieldStyle: 'text-align:center;font-size:10px;color:#244066;',
                                                                    width: '34%',
                                                                    padding: '7 0'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'CK',
                                                                    width: '10%',
                                                                    style: 'text-align: center;',
                                                                    padding: '9 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtCK',
                                                                    value: "",
                                                                    fieldStyle: 'text-align:center;font-size:10px;color:#244066;',
                                                                    width: '10%',
                                                                    padding: '7 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            border: false,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'center'
                                                            },
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 210,
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: '100%',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'ORIGINAL ISSUE',
                                                                            width: '50%',
                                                                            style: 'text-align: center;',
                                                                            padding: '3 0'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.Facsimil.id+'-txtORIN',
                                                                            value: "",
                                                                            fieldStyle: 'text-align:center;font-size:10px;color:#244066;',
                                                                            width: '50%'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: '100%',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'REMITTANCE AREA',
                                                                            width: '100%',
                                                                            style: 'text-align: left;'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: 90,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'text-align:left;',
                                                                            text: 'CASH',
                                                                            width: '100%',
                                                                            padding: '5 0'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: 90,
                                                                    items: [
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.Facsimil.id+'-txtCash',
                                                                            fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                            width: '80%'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: 78,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'text-align:left;',
                                                                            text: 'CREDIT',
                                                                            width: '100%',
                                                                            padding: '5 0'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: 78,
                                                                    items: [
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.Facsimil.id+'-txtCredit',
                                                                            fieldStyle: 'text-align:left;font-size:10px;color:#244066;',
                                                                            width: '80%'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 40,
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: '100%',
                                                                    height: 48,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: prototype.Facsimil.id+'-lblOthers',
                                                                            style: 'text-align:left;color:red;',
                                                                            text: '',
                                                                            width: '100%',
                                                                            padding: '16 0 18 0'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 40,
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: '100%',
                                                                    height: 48,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: prototype.Facsimil.id+'-lblVD',
                                                                            style: 'text-align:left;color:red;',
                                                                            text: '',
                                                                            width: '100%',
                                                                            padding: '16 0 18 0'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 203,
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    width: '100%',
                                                                    height: 48,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: prototype.Facsimil.id+'-lblTicket',
                                                                            style: 'font-size:20px;text-align:center;font-weight:bold;font-family:"Times New Roman";',
                                                                            text: '',
                                                                            width: '100%',
                                                                            padding: '11 0 12 0'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            defaults: {
                                                                width: 85
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'text-align:left;',
                                                                            text: 'COMM%',
                                                                            width: '100%',
                                                                            padding: '5 0'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    height: 24,
                                                                    items: [
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                            width: 124,
                                                            defaults: {
                                                                width: '100%'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'text-align:left;',
                                                                            text: 'TAX',
                                                                            width: '100%',
                                                                            padding: '5 0'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                                    height: 24,
                                                                    items: [
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        //</editor-fold>
                                        //<editor-fold defaultstate="collapsed" desc="Panel 3">
                                        {
                                            layout: 'vbox',
                                            border: false,
                                            width: 124,
                                            defaults: {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    border: true,
                                                    height: 127,
                                                    items: [
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;',
                                                            text: 'TAX',
                                                            width: '100%',
                                                            padding: '5 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: 'hbox',
                                                    bodyStyle: 'font-size:10px;color:#0B333C;font-weight:bold;background-color:transparent;border-style:solid;border-color:#B7BABC;border-width:1px;',
                                                    height: 24,
                                                    items: [
                                                    ]
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            width: 1040,
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background-color: #DDEDF6;',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            layout: 'vbox',
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                width: 604
                                            },
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Prorate Nbr',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020KEY',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Ticket',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtTicket2',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 122
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Group',
                                                            width: 91,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020GRUPO',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Source',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020TUSO',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Billed',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050FBILLED',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 45
                                                        },
                                                        {xtype: 'tbspacer', width: 102},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Invoice Nbr.',
                                                            width: 91,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050CRTR',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Issue Date',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728FECVTA',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Flight Date',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050FVUELO',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 73},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Clearing',
                                                            width: 91,
                                                            padding: '4 0 4 3',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Clearing Date and Pre-Closure'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020FRECHA',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Issue Place',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728CTYEMI',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Flight  Nbr.',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050NVUELO',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 72},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Plus',
                                                            width: 91,
                                                            padding: '4 0 4 3',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'IT Code'
                                                            }
                                                        },
                                                        {
                                                            xtype:'combo',
                                                            id: prototype.Facsimil.id+'-cmbA728IPLUS',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["", "?"], ["S", "Si"], ["N", "No"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: false,
                                                            width: 45,
                                                            value: "",
                                                            disabled: true,
                                                            typeAhead: true,
                                                            valueField: 'code', displayField: 'name',
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728CPLUSS',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 50,
                                                            padding: '0 3 0 0'
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'ATBP',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728ATBP',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Currency',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728MDAATB',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 45
                                                        },
                                                        {xtype: 'tbspacer', width: 2},
                                                        {
                                                            xtype: 'button',
                                                            id:prototype.Facsimil.id+'-btnNucRoe',
                                                            style: 'font-weight:bold;background:#024F79;',
                                                            html: '<strong style="background:#024F79;color:white;">Nuc*Roe</strong>',
                                                            border: true,
                                                            scale: 'small',
                                                            tooltip: 'Show Nuc and Roe',
                                                            width: 75,
                                                            listeners:{
                                                                click: 'btnNucRoe_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 24},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'IT Code',
                                                            width: 91,
                                                            padding: '4 0 4 3',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'IT Code'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728CODIT',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 6">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Fare',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020TARIFA',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Discount',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728TDESC',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:left;color:#244066;background:white;',
                                                            width: 45
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: '%',
                                                            width: 16,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728PORDES',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 57,
                                                            padding: '0 3 0 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Qty Passenger',
                                                            width: 91,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050QPAX',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 7">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Misc',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728CODTAX',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Fare Basis',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728FBASE1',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 72
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728LOHO',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 45,
                                                            padding: '0 0 0 1',
                                                            inputAttrTpl: "data-qtip='Airline Long Haul'"
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Equivalent',
                                                            width: 91,
                                                            padding: '4 0 4 6'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020FAREUS',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 74,
                                                            padding: '0 0 0 3'
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 8">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Seg.',
                                                            width: 74,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020QSEG',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Stopover',
                                                            width: 80,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728CSOVER',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 72
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728QSOVER',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;color:#244066;background:white;',
                                                            width: 45,
                                                            padding: '0 0 0 1'
                                                        }
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            layout: 'vbox',
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                width: 436
                                            },
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Billing Airline',
                                                            width: 90,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050AIRLIN3',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Airline Name',
                                                            width: 85,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtDES_BAIR',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 150
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Billing Date',
                                                            width: 90,
                                                            padding: '4 0',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Billing Date (YYYYMMDD)'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050FCONTA',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Period',
                                                            width: 85,
                                                            padding: '4 0 4 3',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Billing Date (YYYYMMDD)'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020PSTRF',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 50
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Sector',
                                                            width: 90,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728SECDS',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Flown Route',
                                                            width: 85,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA050RUTVOL',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 120
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Journey Init',
                                                            width: 90,
                                                            padding: '4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728RUTORG',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Selling Place',
                                                            width: 85,
                                                            padding: '4 0 4 3'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA728CTYVTA',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 120
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'Processed',
                                                            width: 90,
                                                            padding: '4 0',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Processed Date and Time'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020SDATE',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 74
                                                        },
                                                        {xtype: 'tbspacer', width: 25},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:left;font-weight:normal;color:#244066;',
                                                            text: 'By',
                                                            width: 85,
                                                            padding: '4 0 4 3',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Last Update by (User)'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020USER',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:center;color:#244066;background:white;',
                                                            width: 150
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 6">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:#DBDEE0;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 64,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:10px;',
                                                                    text: 'TC:',
                                                                    width: 29,
                                                                    padding: '5 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtA020TCALC',
                                                                    readOnly: true,
                                                                    value: '',
                                                                    inputWrapCls: '',
                                                                    fieldStyle: 'text-align:left;background-color:#DBDEE0;font-weight:bold;font-family:Verdana;border-color:#DBDEE0;border-style:solid;',
                                                                    width: 23
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:#DBDEE0;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 64,
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:10px;',
                                                                    text: 'GROSS',
                                                                    width: 60,
                                                                    padding: '4 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:#DBDEE0;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 118,
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:10px;',
                                                                    text: 'ISC',
                                                                    width: 110,
                                                                    padding: '4 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:#DBDEE0;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 118,
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:10px;',
                                                                    text: 'OTHER',
                                                                    width: 110,
                                                                    padding: '4 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:#DBDEE0;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 62,
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:10px;',
                                                                    text: 'TAX',
                                                                    width: 56,
                                                                    padding: '4 0'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 7">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:#DBDEE0;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 64,
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:10px;',
                                                                    text: 'VALUE',
                                                                    width: 62,
                                                                    padding: '4 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 64,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtA020ACEPTA',
                                                                    readOnly: true,
                                                                    value: '',
                                                                    fieldStyle: 'text-align:right;background-color:white;',
                                                                    width: 56
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 118,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtA020COMISP',
                                                                    readOnly: true,
                                                                    value: '',
                                                                    fieldStyle: 'text-align:right;background-color:white;',
                                                                    width: 40
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:9px;',
                                                                    text: '%',
                                                                    width: 14,
                                                                    padding: '4 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtA020COMISI',
                                                                    readOnly: true,
                                                                    value: '',
                                                                    fieldStyle: 'text-align:right;background-color:white;',
                                                                    width: 56
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 118,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtA050OVRISC',
                                                                    readOnly: true,
                                                                    value: '',
                                                                    fieldStyle: 'text-align:right;background-color:white;',
                                                                    width: 40
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:9px;',
                                                                    text: '%',
                                                                    width: 14,
                                                                    padding: '4 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtA050OVRAMT',
                                                                    readOnly: true,
                                                                    value: '',
                                                                    fieldStyle: 'text-align:right;background-color:white;',
                                                                    width: 56
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 62,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Facsimil.id+'-txtA050TUA',
                                                                    readOnly: true,
                                                                    value: '',
                                                                    fieldStyle: 'text-align:right;background-color:white;',
                                                                    width: 56
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>
                                                //<editor-fold defaultstate="collapsed" desc="Fila 8">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'color:#0B333C;background-color:transparent;border-style:solid;border-color:#CADAE4;border-width:2px;',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'color:#0B333C;background-color:#DBDEE0;border-style:solid;border-color:#CADAE4;border-top-width:0px;border-right-width:2px;border-bottom-width:0px;border-left-width:0px;',
                                                            width: 364,
                                                            height: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'text-align:center;color:#000000;font-weight:bold;font-size:10px;',
                                                                    text: 'NET AMOUNT',
                                                                    width: '100%',
                                                                    padding: '4 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Facsimil.id+'-txtA020NETO',
                                                            readOnly: true,
                                                            value: '',
                                                            fieldStyle: 'text-align:right;background-color:white;',
                                                            width: 56
                                                        }
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.Facsimil.id+'-boxMainData',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: 1040,
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridData">
                                        {
                                            xtype: 'grid',
                                            id: prototype.Facsimil.id+'-gridData',
                                            width: '100%',
                                            height: 123,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'X/O', dataIndex: 'A728XO', width: 33
                                                    },
                                                    {
                                                        text: 'FROM', dataIndex: 'A728RUTAO', width: 47,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector !== '') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'TO', dataIndex: 'A728RUTAD', width: 31,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector !== '') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Carr', dataIndex: 'A728CARRA1', width: 38,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flight', dataIndex: 'A728NVLO1', width: 54,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'RBD', dataIndex: 'A728BOOKI1', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Surcharge', dataIndex: 'A728FARE1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Fare', dataIndex: 'A728FARE1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'St', dataIndex: 'A728TFARE1', width: 32,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Factor', dataIndex: 'A728FACT1', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Proviso', dataIndex: 'A728PROV1', width: 62,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '%Prov', dataIndex: 'A728PPRO1', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'SPA', dataIndex: 'A728ACUEO1', width: 62,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'A728VALOR1', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'SRP', dataIndex: 'A728VLSRP1', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'MPA', dataIndex: 'A728VLMPA1', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Adjust', dataIndex: 'A728AJUST1', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Diferential', dataIndex: 'A728DIFER1', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:right;color:"+color+";font-size:11;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Flag', dataIndex: 'A728FDIFE1', flex: 1,//width: 35,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = (data.esSector === 'todo') ? '#2BC224' : '#244066';
                                                            metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.Facsimil.id+'-boxDataAccounting',
                            hidden: true,
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            border: false,
                            bodyStyle: 'background-color: #DDEDF6;',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: '100%',
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridDataAccounting">
                                        {
                                            xtype: 'grid',
                                            id: prototype.Facsimil.id+'-gridDataAccounting',
                                            width: '100%',
                                            height: 278,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'MODE', dataIndex: 'A1716MODO', width: 50
                                                    },
                                                    {
                                                        text: 'SRC', dataIndex: 'A1716FUENT', width: 40
                                                    },
                                                    {
                                                        text: 'SUB<br>SRC', dataIndex: 'A1716SUBFU', width: 40
                                                    },
                                                    {
                                                        text: 'FOP', dataIndex: 'A1716FP', width: 40
                                                    },
                                                    {
                                                        text: 'CPN', dataIndex: 'A1716CUPON', width: 40
                                                    },
                                                    {
                                                        text: 'SEQ', dataIndex: 'A1716SEQ', width: 40
                                                    },
                                                    {
                                                        text: 'ACCOUNTING',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'DATE', dataIndex: 'A1716FPRO', width: 70
                                                            },
                                                            {
                                                                text: 'PERIOD', dataIndex: 'A1716FCONT', width: 70
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'ACCOUNT NUMBER', dataIndex: 'A1716CUENT', flex: 1,//width: 277,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;font-family:'Courier New';";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'LOCAL AMOUNT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'CURR', dataIndex: 'A1716CUR', width: 50
                                                            },
                                                            {
                                                                text: 'DEBIT', dataIndex: 'A1716ACTIV', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    value = data.A1716MODO !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'CREDIT', dataIndex: 'A1716PASIV', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    value = data.A1716MODO !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'REVENUE AMOUNT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'CURR', dataIndex: 'CUR2', width: 50
                                                            },
                                                            {
                                                                text: 'DEBIT', dataIndex: 'ACTIV2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    value = data.A1716MODO !== '' ? Ext.util.Format.number(data.ACTIV2, '0,000.00') : '';
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'CREDIT', dataIndex: 'PASIV2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    value = data.A1716MODO !== '' ? Ext.util.Format.number(data.PASIV2, '0,000.00') : '';
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'CONCEPT', dataIndex: 'A1716TITU', width: 245,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'CLIENT', dataIndex: 'A1716COPE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'PROVIDER', dataIndex: 'A1716PROV', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'JOURNAL<br>ENTRY', dataIndex: 'A1716IDCON', width: 80
                                                    },
                                                    {
                                                        text: 'EXCHANGE<br>RATE', dataIndex: 'A720ROE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            value = data.A1716MODO !== '' ? Ext.util.Format.number(data.A1530TCAMB, '0,000.000000') : '';
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});