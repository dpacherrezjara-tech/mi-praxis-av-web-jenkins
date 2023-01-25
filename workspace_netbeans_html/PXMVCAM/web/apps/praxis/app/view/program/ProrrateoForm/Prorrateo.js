Ext.define('Ext.Praxis.view.program.ProrrateoForm.Prorrateo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.Prorrateo.id+'-prorrateo',
    layout: 'border',
    align: 'center',
    defaults: {
        bodyStyle: 'background: transparent;'
    },
    items: [
        {
            region: 'center',
            id: prototype.Prorrateo.id+'-boxConsultas',
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
                    id: prototype.Prorrateo.id+'-box1',
                    width: prototype.Prorrateo.widthContenedor,
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
                                    id: prototype.Prorrateo.id+'-btnProrate',
                                    style: 'font-weight:bold;background:#22CE0B;',
                                    html: '<strong style="background:#22CE0B;color:white;">P</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Prorate Ticket',
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
                                    id: prototype.Prorrateo.id+'-btnSaveProrate',
                                    style: 'font-weight:bold;background:#22CE0B;',
                                    html: '<strong style="background:#22CE0B;color:white;">SP</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Save Prorate Ticket',
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
                                    id: prototype.Prorrateo.id+'-btnLog',
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
                                    id: prototype.Prorrateo.id+'-btnShowTaxes',
                                    style: 'font-weight:bold;background:#02507A;',
                                    html: '<strong style="background:#02507A;color:white;">ST</strong>',
                                    border: true,
                                    scale: 'small',
                                    tooltip: 'Show Taxes',
                                    width: 45,
                                    listeners: {
                                        click: 'btnShowTaxes_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    id: prototype.Prorrateo.id+'-btnShowComments',
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
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'image',
                                    id: prototype.Prorrateo.id+'-imgRevi',
                                    src: 'resources/img/botones/check.png',
                                    width: 16,
                                    height: 16,
                                    mode: 'image',
                                    margin: '3 0',
                                    listeners: {
                                        afterrender: function(c) {
                                            Ext.create('Ext.tip.ToolTip', {
                                                target: c.getEl(),
                                                html: 'Reviewed'
                                            });
                                        },
                                        el: {
                                            click: function() {
                                                global.Msg({msg: 'Under Construction'});
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 420},
                                {
                                    xtype: 'label',
                                    text: 'Action :',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    margin: '4 0',
                                    width: 65
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.Prorrateo.id+'-cmbAction',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["P", "Prorate"], ["SP", "Save Prorate"], ["SL", "Show Proration Log"], ["ST", "Show Taxes"], ["SC", "Show Comments"],
                                            ["R", "Reviewed"], ["FI", "Find Image"], ["FT", "Find TCN Image"], ["FN", "Find TCN Tonus"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 120,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 130},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("P");
                                        },
                                        keypress: 'txtFilterValue_keyDownHandler',
                                        click: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'button',
                                    id: prototype.Prorrateo.id+'-btnExecute',
                                    html: '<strong>Execute</strong>',
                                    border: true,
                                    scale: 'small',
                                    width: 75,
                                    listeners: {
                                        click: 'btnShowTaxes1_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 24},
                                {
                                    xtype: 'image',
                                    id: prototype.Prorrateo.id+'-imgNext',
                                    src: 'resources/img/botones/next2.png',
                                    width: 16,
                                    height: 16,
                                    mode: 'image',
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
                                    id: prototype.Prorrateo.id+'-btnExecute0',
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

                        //<editor-fold defaultstate="collapsed" desc="Primer Panel">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            padding: '3 0 2 0',
                            bodyStyle: 'background-color: transparent;border-style:solid;border-color:#7F98A8;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Columna 1">
                                {
                                    xtype: 'panel',
                                    width: 195,
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    padding: '4 7',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Prorate Nbr',
                                                    style: 'color:#0B333C;',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA020KEY',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 90
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Issue Date',
                                                    style: 'color:#0B333C;',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA728FECVTA',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    width: 90,
                                                    listeners: {
                                                        keypress: 'txtValidar_keyDownHandler'
                                                    }
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Issue Place',
                                                    style: 'color:#0B333C;',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA728CTYEMI',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    width: 90,
                                                    validator: function(value) {
                                                        if (value === "") {
                                                            return "It requires you to enter a Issue Place";
                                                        } else
                                                            return true;
                                                    },
                                                    listeners: {
                                                        keypress: 'txtValidar_keyDownHandler'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 7},
                                //<editor-fold defaultstate="collapsed" desc="Columna 2">
                                {
                                    xtype: 'panel',
                                    width: 231,
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    padding: '4 7',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Ticket Number',
                                                    style: 'color:#0B333C;',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'CCIA(3)+FORMA(4)+SERIE(6)+CUPON (1)'
                                                    },
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtTicket',
                                                    fieldStyle: 'text-align:left;',
                                                    readOnly: true,
                                                    width: 108
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Flight Date',
                                                    style: 'color:#0B333C;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA728FVLO1',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    width: 100,
                                                    listeners: {
                                                        keypress: 'txtValidar_keyDownHandler'
                                                    }
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Selling Place',
                                                    style: 'color:#0B333C;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA728CTYVTA',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    width: 100,
                                                    validator: function(value) {
                                                        if (value === "") {
                                                            return "It requires you to enter a Selling Place";
                                                        } else
                                                            return true;
                                                    },
                                                    listeners: {
                                                        keypress: 'txtValidar_keyDownHandler'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 7},
                                //<editor-fold defaultstate="collapsed" desc="Columna 3">
                                {
                                    xtype: 'panel',
                                    width: 192,
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    padding: '4 7',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Group',
                                                    style: 'color:#0B333C;',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA020GRUPO',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Clearing',
                                                    style: 'color:#0B333C;',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Clearing Date and Pre-Closure'
                                                    },
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA020FRECHA',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'IT',
                                                    style: 'color:#0B333C;',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'IT Code'
                                                    },
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA728CODIT',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 20,
                                                    width: 100,
                                                    validator: function(value) {
                                                        if (value === "") {
                                                            return "It requires you to enter a IT Code";
                                                        } else
                                                            return true;
                                                    },
                                                    listeners: {
                                                        keypress: 'txtValidar_keyDownHandler'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 7},
                                //<editor-fold defaultstate="collapsed" desc="Columna 4">
                                {
                                    xtype: 'panel',
                                    width: 212,
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    padding: '4 7',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
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
                                                    id: prototype.Prorrateo.id+'-txtA728AIRFAC',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 70
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                             bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
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
                                                    id: prototype.Prorrateo.id+'-txtA020SDATE',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                             bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'RM',
                                                    style: 'color:#0B333C;',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Flag RM - Number - Class'
                                                    },
                                                    width: 90
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA020RMSN',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 48
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 7},
                                //<editor-fold defaultstate="collapsed" desc="Columna 5">
                                {
                                    xtype: 'panel',
                                    width: 212,
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    padding: '4 7',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Billing Date',
                                                    style: 'color:#0B333C;',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Billing Date (YYYYMMDD)'
                                                    },
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA020SUFECH',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 6},
                                        {xtype: 'tbspacer', height: 22},
                                        //                                {
                                        //                                    xtype: 'panel',
                                        //                                    width: '100%',
                                        //                                    layout: 'hbox',
                                        //                                    border: false,
                                        //                                    bodyStyle: 'background-color: transparent;',
                                        //                                    defaults: {
                                        //                                        anchor: '100%'
                                        //                                    },
                                        //                                    items: [
                                        //                                        {
                                        //                                            xtype: 'label',
                                        //                                            text: 'B',
                                        //                                            hidden: true,
                                        //                                            style: 'color:#0B333C;',
                                        //                                            width: 80
                                        //                                        },
                                        //                                        {
                                        //                                            xtype: 'textfield',
                                        //                                            id: prototype.Prorrateo.id+'-txtA',
                                        //                                            fieldStyle: 'text-align:center;',
                                        //                                            hidden: true,
                                        //                                            readOnly: true,
                                        //                                            width: 109
                                        //                                        }
                                        //                                    ]
                                        //                                },
                                        {xtype: 'tbspacer', height: 6},
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                             bodyStyle: 'background-color: #ECFAFF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'By',
                                                    style: 'color:#0B333C;',
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Last Update by (User)'
                                                    },
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA020USER',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 109
                                                }
                                            ]
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        },
                        //</editor-fold>

                        //<editor-fold defaultstate="collapsed" desc="Segundo Panel">
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            padding: '0 0 6 0',
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="Panel 1">
                                {
                                    xtype: 'panel',
                                    width: 630,
                                    layout: 'vbox',
                                    border: true,
                                    bodyStyle: 'background-color: transparent;border-style:solid;border-color:#B7BABC;',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="Columna 1">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 2 1 7',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'ATBP',
                                                                    style: 'color:#0B333C;',
                                                                    width: 80
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728ATBP',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 15,
                                                                    width: 90,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Fare',
                                                                    style: 'color:#0B333C;',
                                                                    width: 80
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020TARIFA',
                                                                    fieldStyle: 'text-align:left;',
                                                                    width: 90,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Misc',
                                                                    style: 'color:#0B333C;',
                                                                    width: 80
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728CODTAX',
                                                                    fieldStyle: 'text-align:left;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 10,
                                                                    width: 90,
                                                                    validator: function(value) {
                                                                        if (value === "") {
                                                                            return "It requires you to enter a Tax Code";
                                                                        } else
                                                                            return true;
                                                                    },
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Sector',
                                                                    style: 'color:#0B333C;',
                                                                    width: 80
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728SECDS',
                                                                    fieldStyle: 'text-align:left;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 12,
                                                                    width: 90,
                                                                    validator: function(value) {
                                                                        if (value === "") {
                                                                            return "It requires you to enter a Sector";
                                                                        } else
                                                                            return true;
                                                                    },
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>

                                                //<editor-fold defaultstate="collapsed" desc="Columna 2">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 2 1 7',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            width: 220,
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Currency',
                                                                    style: 'color:#0B333C;',
                                                                    width: 82
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728MDAATB',
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
                                                                    id: prototype.Prorrateo.id+'-btnNucRoe',
                                                                    style: 'font-weight:bold;background:#024F79;',
                                                                    html: '<strong style="background:#024F79;color:white;">Nuc*Roe</strong>',
                                                                    border: true,
                                                                    scale: 'small',
                                                                    tooltip: 'Show Nuc and Roe',
                                                                    width: 80,
                                                                    listeners: {
                                                                        click: 'btnNucRoe_clickHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            width: 220,
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Equivalent',
                                                                    style: 'color:#0B333C;',
                                                                    width: 82
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020FAREUS',
                                                                    fieldStyle: 'text-align:left;',
                                                                    width: 130,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            width: 220,
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Discount',
                                                                    style: 'color:#0B333C;',
                                                                    width: 82
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728TDESC',
                                                                    fieldStyle: 'text-align:left;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 2,
                                                                    width: 48,
                                                                    validator: function(value) {
                                                                        if (value === "") {
                                                                            return "It requires you to enter a Discount Type";
                                                                        } else
                                                                            return true;
                                                                    },
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '%',
                                                                    width: 20
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728PORDES',
                                                                    fieldStyle: 'text-align:left;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 7,
                                                                    width: 62,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Journey Init',
                                                                    style: 'color:#0B333C;',
                                                                    width: 82
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728RUTORG',
                                                                    fieldStyle: 'text-align:left;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 3,
                                                                    width: 48,
                                                                    enableKeyEvents: true,
                                                                    validator: function(value) {
                                                                        if (value === "") {
                                                                            return "It requires you to enter a Journey Init";
                                                                        } else
                                                                            return true;
                                                                    },
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.Prorrateo.id+'-btnFareBasis',
                                                                    style: 'font-weight:bold;background:#024F79;',
                                                                    html: '<strong style="background:#024F79;color:white;">Fare Basis</strong>',
                                                                    border: true,
                                                                    scale: 'small',
                                                                    tooltip: 'Show Fare Basis',
                                                                    width: 90,
                                                                    listeners: {
                                                                        click: 'btnNucRoe_clickHandler'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>

                                                //<editor-fold defaultstate="collapsed" desc="Columna 3">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 2 1 7',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Plus',
                                                                    style: 'color:#0B333C;',
                                                                    autoEl: {
                                                                        tag: 'label',
                                                                        'data-qtip': 'IT Code'
                                                                    },
                                                                    width: 65
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.Prorrateo.id+'-cmbA728IPLUS',
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
                                                                    width: 58,
                                                                    typeAhead: true,
                                                                    valueField: 'code', displayField: 'name',
                                                                    enableKeyEvents: true,
                                                                    triggerAction: 'all',
                                                                    listeners: {
                                                                        afterrender: function(combo, eOpts) {
                                                                            combo.setValue("");
                                                                        },
                                                                        focus: function(combo) {
                                                                            combo.expand();
                                                                        }
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 2},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728CPLUSS',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 15,
                                                                    width: 86,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Q',
                                                                    style: 'color:#0B333C;',
                                                                    width: 65
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020QSEG',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 146,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Stopover',
                                                                    style: 'color:#0B333C;',
                                                                    width: 65
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728CSOVER',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 15,
                                                                    width: 80,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 2},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728QSOVER',
                                                                    fieldStyle: 'text-align:left;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
//                                                                    maxLength: 2,
                                                                    width: 64,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E2F9DF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728FBASE1',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 10,
                                                                    width: 145,
                                                                    validator: function(value) {
                                                                        if (value === "") {
                                                                            return "It requires you to enter a Fare Basis";
                                                                        } else
                                                                            return true;
                                                                    },
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 2},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA728LOHO',
                                                                    fieldStyle: 'text-align:left;',
                                                                    inputAttrTpl: "data-qtip='Airline Long Haul'",
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 3,
                                                                    width: 64,
                                                                    validator: function(value) {
                                                                        if (value === "") {
                                                                            return "It requires you to enter a Airline LongHaul";
                                                                        } else
                                                                            return true;
                                                                    },
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 628,
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: #E2F9DF;',
                                            padding: '1 2 4 4',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 182},
                                                {
                                                    xtype: 'label',
                                                    text: 'Rerouting',
                                                    style: 'color:#0B333C;',
                                                    width: 82
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA728RERUT',
                                                    fieldStyle: 'text-align:left;',
                                                    enforceMaxLength: true,
                                                    maxLength: 1,
                                                    width: 88,
                                                    validator: function(value) {
                                                        if (value === "") {
                                                            return "It requires you to enter a Involuntary Rerouting";
                                                        } else
                                                            return true;
                                                    },
                                                    listeners: {
                                                        keypress: 'txtValidar_keyDownHandler'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.Prorrateo.id+'-lblA020BASE',
                                                    text: '',
                                                    style: 'font-weight:bold;color:#F71137;',
                                                    width: 220
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 3},
                                //<editor-fold defaultstate="collapsed" desc="Panel 2">
                                {
                                    xtype: 'panel',
                                    width: 463,
                                    layout: 'vbox',
                                    border: true,
                                    bodyStyle: 'background-color: transparent;border-style:solid;border-color:#B7BABC;',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="Columna 1">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 2 1 4',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'TC',
                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                    width: 30
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020TCALC',
                                                                    fieldStyle: 'text-align:left;',
                                                                    width: 30,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '5 0 7 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Invoice',
                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                    width: 60
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '5 0 7 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Accept',
                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                    width: 60
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '5 0 7 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Redebit',
                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                    width: 60
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>

                                                //<editor-fold defaultstate="collapsed" desc="Columna 2">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 2 1 1',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '5 0 7 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'GROSS',
                                                                    style: 'font-weight:bold;color:#0B333C;text-align:center;',
                                                                    width: 70
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020SUDEBI',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 70,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020ACEPTA',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 15,
                                                                    width: 70,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020REDEBI',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 70,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>

                                                //<editor-fold defaultstate="collapsed" desc="Columna 3">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 2 1 1',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '5 0 7 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'ISC',
                                                                    style: 'font-weight:bold;color:#0B333C;text-align:center;',
                                                                    width: 109
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020ANALIZ',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 45,
                                                                    readOnly: true
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '%',
                                                                    width: 17
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020IMPNAC',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 45,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020COMISP',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 7,
                                                                    width: 45,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '%',
                                                                    width: 17
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020IMPINT',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 15,
                                                                    width: 45,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 62},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020COMISI',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 45,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>

                                                //<editor-fold defaultstate="collapsed" desc="Columna 4">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 2 1 1',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '5 0 7 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'OTHER',
                                                                    style: 'font-weight:bold;color:#0B333C;text-align:center;',
                                                                    width: 109
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020BOTCPR',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 45,
                                                                    readOnly: true
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '%',
                                                                    width: 17
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020BOTCRM',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 45,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020AOTCPM',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 8,
                                                                    width: 45,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '%',
                                                                    width: 17
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020AOTCRM',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 15,
                                                                    width: 45,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 62},
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020DOTCRM',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 45,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //</editor-fold>

                                                //<editor-fold defaultstate="collapsed" desc="Columna 5">
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '4 0 1 1',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '5 0 7 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'TAX',
                                                                    style: 'font-weight:bold;color:#0B333C;text-align:center;',
                                                                    width: 70
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020TOTDEB',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 70,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020TOTHAB',
                                                                    fieldStyle: 'text-align:right;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 15,
                                                                    width: 70,
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'txtValidar_keyDownHandler'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background-color: #E5ECEF;',
                                                            defaults: {
                                                                anchor: '100%',
                                                                padding: '2 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.Prorrateo.id+'-txtA020TAX',
                                                                    fieldStyle: 'text-align:right;',
                                                                    width: 70,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 436,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            border: false,
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            padding: '1 2 4 4',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Net Amount',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA728MONSYS',
                                                    fieldStyle: 'text-align:right;',
                                                    width: 45,
                                                    readOnly: true
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtA020NETO',
                                                    fieldStyle: 'text-align:right;',
                                                    width: 70,
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.Prorrateo.id+'-boxMainData',
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.Prorrateo.id+'-gridData',
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
                                        text: 'X/O', dataIndex: 'A728XO', width: 35
                                    },
                                    {
                                        text: 'From/To', dataIndex: 'A728RUTAD', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector !== '' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:"+background+";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Carr', dataIndex: 'A728CARRA1', width: 40,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:"+background+";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Flight', dataIndex: 'A728NVLO1', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:"+background+";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'RBD', dataIndex: 'A728BOOKI1', width: 40,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:"+background+";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Surcharge', dataIndex: 'A728SS1', flex: 1, //width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:"+background+";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Fare', dataIndex: 'A728FARE1', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:right;background:"+background+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'St', dataIndex: 'A728TFARE1', width: 35,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:"+background+";";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Factor', dataIndex: 'A728FACT1', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Proviso', dataIndex: 'A728PROV1', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: '%Prov', dataIndex: 'A728PPRO1', width: 55,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'A728ACUEO1', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Value', dataIndex: 'A728VALOR1', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'A728VLSRP1', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'A728VLMPA1', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Adjust', dataIndex: 'A728AJUST1', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                            metaData.style = "text-align:right;color:"+color+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Diferential', dataIndex: 'A728DIFER1', width: 75,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:right;background:"+background+";";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Flag', dataIndex: 'A728FDIFE1', width: 40,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var background = data.esSector === 'todo' ? '#B9E4B7' : '#FFFFFF';
                                            metaData.style = "text-align:center;background:"+background+";";
                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    hidden: false,
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="boxImgRED">
                        {
                            xtype: 'panel',
                            id: prototype.Prorrateo.id+'-boxImgRED',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'image',
                                    id: prototype.Prorrateo.id+'-imgImage',
                                    src: 'resources/img/not_picture.png',
                                    width: 576,
                                    height: 246
                                }
                            ]
                        },
                        //</editor-fold>

                        //<editor-fold defaultstate="collapsed" desc="boxImgTCN">
                        {
                            xtype: 'panel',
                            id: prototype.Prorrateo.id+'-boxImgTCN',
                            hidden: true,
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    width: '100%',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Columna 1">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Issued By',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_IssuedBy',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 265,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Endorsements/Restrictions',
                                                            width: 167
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Endorsements',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 228,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Name of Passenger',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_NamePass',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 264,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Original Issue',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_OriIssue',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 264,
                                                            readOnly: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        //</editor-fold>

                                        //<editor-fold defaultstate="collapsed" desc="Columna 2">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Passenger Ticket and Baggage Check',
                                                            width: 240
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_PassBagg',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 70,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Tour Code',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Tour',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 180,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Conjuction Tickets',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_conjunctions',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 180,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: '',
                                                            width: 130
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        //</editor-fold>

                                        //<editor-fold defaultstate="collapsed" desc="Columna 3">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Origin/Destination',
                                                            width: 150
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Date/Place of Issue',
                                                            width: 160
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_OrigDest',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 140,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_IssueDP',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 160,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Booking Ref',
                                                            width: 120
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Booking',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 186,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Issue in Exchange',
                                                            width: 120
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Exchange',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 186,
                                                            readOnly: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    width: '100%',
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridEtktRout">
                                        {
                                            xtype: 'grid',
                                            id: prototype.Prorrateo.id+'-gridEtktRout',
                                            width: 1040,
                                            height: 120,
                                            columnLines: true,
                                            border: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Cp', dataIndex: 'strCPN', width: 75
                                                    },
                                                    {
                                                        text: 'X/O', dataIndex: 'strXO', width: 75
                                                    },
                                                    {
                                                        text: 'From', dataIndex: 'strFROM', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="'+data.strDescFROM+'"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'To', dataIndex: 'strTO', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="'+data.strDescTO+'"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Cr', dataIndex: 'strCR', width: 75
                                                    },
                                                    {
                                                        text: 'Flight', dataIndex: 'strFLIGHT', width: 75
                                                    },
                                                    {
                                                        text: 'Class', dataIndex: 'strCLASS', width: 75
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'strDATE', width: 75
                                                    },
                                                    {
                                                        text: 'Time', dataIndex: 'strTIME', width: 75
                                                    },
                                                    {
                                                        text: 'Fare Basis', dataIndex: 'strFAREBASIS', flex: 1//width: 75
                                                    },
                                                    {
                                                        text: 'NVB', dataIndex: 'strNVB', width: 75
                                                    },
                                                    {
                                                        text: 'NVA', dataIndex: 'strNVA', width: 75
                                                    },
                                                    {
                                                        text: 'St', dataIndex: 'strST', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Columna 1">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 330,
                                            border: false,
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Fare',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 100,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Equiv.Fare',
                                                            width: 75
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_EFare',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 100,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Tax',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Tax1',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 100,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Tax',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Tax2',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 100,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Tax',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Tax3',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 100,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Total',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_Total',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 100,
                                                            readOnly: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        //</editor-fold>

                                        //<editor-fold defaultstate="collapsed" desc="Columna 2">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 700,
                                            border: false,
                                            bodyStyle: 'background-color: #E5ECEF;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Fare Calculation',
                                                    width: 150
                                                },
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.Prorrateo.id+'-txtT_FareCal',
                                                    value: '',
                                                    readOnly: true,
                                                    width: 690,
                                                    height: 50
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.Prorrateo.id+'-txtT_TotalTaxes',
                                                    fieldStyle: 'text-align:center;',
                                                    width: 690,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E5ECEF;',
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '2 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Form of Payment',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.Prorrateo.id+'-txtT_FormPay',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 559,
                                                            readOnly: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                }
            ]
        }
    ]
});