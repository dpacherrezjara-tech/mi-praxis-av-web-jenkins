Ext.define('Ext.Praxis.view.program.ProrrateoA728Form.ProrrateoA728', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-prorrateo',
    layout: 'border',
    align: 'center',
    defaults: {
        bodyStyle: 'background: transparent;'
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxConsultas',
            border: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-box1',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    hidden: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Cabecera">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            padding: '6 0 3 0',
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnLog',
                                    style: 'font-weight:bold;background:#02507A;',
                                    html: '<strong style="background:#02507A;color:white;">L</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Show Proration Log',
                                    width: 35,
                                    listeners: {
                                        click: function() {
                                            global.Msg({msg: 'Under Construction'});
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnShowTaxes',
                                    style: 'font-weight:bold;background:#02507A;',
                                    html: '<strong style="background:#02507A;color:white;">ST</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Show Taxes',
                                    width: 45,
                                    listeners: {
                                        click: function() {
                                            global.Msg({msg: 'Under Construction'});
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnShowComments',
                                    style: 'font-weight:bold;background:#02507A;',
                                    html: '<strong style="background:#02507A;color:white;">SC</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Show Comments',
                                    width: 45,
                                    listeners: {
                                        click: function() {
                                            global.Msg({msg: 'Under Construction'});
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 885},
                                {
                                    xtype: 'image',
                                    id: prototype.id + '-imgNext',
                                    src: 'resources/img/botones/next2.png',
                                    width: 16,
                                    height: 16,
                                    mode : 'image',
                                    margin: '3 0',
                                    listeners: {
                                        afterrender: function(c) {
                                            Ext.create('Ext.tip.ToolTip', {
                                                target: c.getEl(),
                                                html: '<label style="cursor:pointer;">View Next Ticket</label>'
                                            });
                                        },
                                        el: {
                                            click: function() {
                                                global.Msg({msg: 'Under Construction'});
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnExecute0',
                                    style: 'font-weight:bold;background:#02507A;',
                                    html: '<strong style="background:#02507A;color:white;">Back</strong>',
                                    border: true,
                                    scale: 'small',
                                    width: 60,
                                    listeners: {
                                        click: 'imgBack_clickHandler'
                                    }
                                }
                            ]
                        },
                        //</editor-fold>

                        //<editor-fold defaultstate="collapsed" desc="Fila 1">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;border-style:solid;border-color:#6CB6E7;border-width:2px;',
                            defaults: {
                                anchor: '100%',
                                padding: '2 7'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Prorate Nbr',
                                    style: 'color:#0B333C;',
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA020KEY',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 90
                                },
                                {
                                    xtype: 'label',
                                    text: 'Ticket Number',
                                    style: 'color:#0B333C;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'CCIA(3) + FORMA(4) + SERIE(6) + CUPON (1)'
                                    },
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTicket',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 130
                                },
                                {
                                    xtype: 'label',
                                    text: 'Billing Airline',
                                    style: 'color:#0B333C;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Billing Airline and Alphanumeric Code'
                                    },
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA728AIRFAC',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 90
                                },
                                {
                                    xtype: 'label',
                                    text: 'Billing Date',
                                    style: 'color:#0B333C;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Billing Date (YYYYMMDD)'
                                    },
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA020SUFECH',
                                    fieldStyle: 'text-align:left;',
                                    readOnly: true,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Processed',
                                    style: 'color:#0B333C;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Processed Date and Time'
                                    },
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA020SDATE',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 120
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 2},
                        //<editor-fold defaultstate="collapsed" desc="Fila 2">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;border-style:solid;border-color:#6CB6E7;border-width:2px;',
                            defaults: {
                                anchor: '100%',
                                padding: '2 7'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Issue Date',
                                    style: 'color:#0B333C;',
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA728FECVTA',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 90,
                                    listeners: {
                                        keypress: 'txtValidar_keyDownHandler'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flight Date',
                                    style: 'color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA728FVLO1',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 130,
                                    listeners: {
                                        keypress: 'txtValidar_keyDownHandler'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Issue Place',
                                    style: 'color:#0B333C;',
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA728CTYEMI',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 90,
                                    listeners: {
                                        keypress: 'txtValidar_keyDownHandler'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Selling Place',
                                    style: 'color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA728CTYVTA',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 100,
                                    listeners: {
                                        keypress: 'txtValidar_keyDownHandler'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'By',
                                    style: 'color:#0B333C;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Last Update by (User)'
                                    },
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA020USER',
                                    fieldStyle: 'text-align:left;',
                                    readOnly: true, 
                                    width: 120
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 2},
                        //<editor-fold defaultstate="collapsed" desc="Fila 3">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E2F9DF;',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '2 7'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'ATBP',
                                            style: 'color:#0B333C;',
                                            width: 92
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728ATBP',
                                            fieldStyle: 'text-align:right;',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            width: 90,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            style: 'color:#0B333C;',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728MDAATB',
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 50,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnNucRoe',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">Nuc*Roe</strong>',
                                            border: true,
                                            scale: 'small',
                                            tooltip: 'Show Nuc and Roe',
                                            width: 80,
                                            listeners: {
                                                click: 'btnNucRoe_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Plus',
                                            style: 'color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'IT Code'
                                            },
                                            width: 90
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbA728IPLUS',
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
                                            editable: true,
                                            width: 55,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728CPLUSS',
                                            fieldStyle: 'text-align:right;',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            width: 135,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 95},
                                        {
                                            xtype: 'label',
                                            text: 'IT',
                                            style: 'color:#0B333C;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'IT Code'
                                            },
                                            width: 93
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728CODIT',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            width: 120,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 2},
                        //<editor-fold defaultstate="collapsed" desc="Fila 4">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E2F9DF;',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '2 7'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Sector',
                                            style: 'color:#0B333C;',
                                            width: 92
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728SECDS',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            width: 90,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Discount',
                                            style: 'color:#0B333C;',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728TDESC',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            width: 48,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: '%',
                                            width: 20,
                                            padding: '2 7 2 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728PORDES',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 7,
                                            width: 60,
                                            padding: '2 7 2 0',
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Stopover',
                                            style: 'color:#0B333C;',
                                            width: 85,
                                            padding: '2 7 2 2'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728CSOVER',
                                            fieldStyle: 'text-align:right;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            width: 100,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728QSOVER',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
//                                            maxLength: 2,
                                            width: 90,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 55},
                                        {
                                            xtype: 'label',
                                            text: 'Involuntary Rerouting',
                                            style: 'color:#0B333C;',
                                            width: 133
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728RERUT',
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            width: 120,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 2},
                        //<editor-fold defaultstate="collapsed" desc="Fila 5">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E2F9DF;',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '2 7'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Journey Init',
                                            style: 'color:#0B333C;',
                                            width: 92
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728RUTORG',
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 90,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Result Currency',
                                            style: 'color:#0B333C;',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA0',
                                            fieldStyle: 'text-align:left;',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 50,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnFareBasis',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">Fare Basis</strong>',
                                            border: true,
                                            scale: 'small',
                                            tooltip: 'Show Fare Basis',
                                            width: 90,
                                            listeners: {
                                                click: 'btnNucRoe_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728FBASE1',
                                            fieldStyle: 'text-align:right;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 154,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA728LOHO',
                                            fieldStyle: 'text-align:left;',
                                            inputAttrTpl: "data-qtip='Airline Long Haul'",
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 64,
                                            listeners: {
                                                keypress: 'txtValidar_keyDownHandler'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 2}
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: '100%',
                            height: 168,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'X/O', dataIndex: 'A728XO', width: 35
                                    },
                                    {
                                        text: 'From/To', dataIndex: 'A728RUTAD', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector !== '' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:" + background + ";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Carr', dataIndex: 'A728CARRA1', width: 40,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:" + background + ";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Flight', dataIndex: 'A728NVLO1', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:" + background + ";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'RBD', dataIndex: 'A728BOOKI1', width: 40,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:" + background + ";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Surcharge', dataIndex: 'A728SS1', flex: 1,//width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:" + background + ";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Fare', dataIndex: 'A728FARE1', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:right;background:" + background + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'St', dataIndex: 'A728TFARE1', width: 35,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:" + background + ";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Factor', dataIndex: 'A728FACT1', width: 65,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Proviso', dataIndex: 'A728PROV1', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: '%Prov', dataIndex: 'A728PPRO1', width: 55,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'A728ACUEO1', width: 65,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Value', dataIndex: 'A728VALOR1', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'A728VLSRP1', width: 65,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'A728VLMPA1', width: 65,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Adjust', dataIndex: 'A728AJUST1', width: 65,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:" + color + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Diferential', dataIndex: 'A728DIFER1', width: 75,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:right;background:" + background + ";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Flag', dataIndex: 'A728FDIFE1', width: 40,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:" + background + ";";
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
});