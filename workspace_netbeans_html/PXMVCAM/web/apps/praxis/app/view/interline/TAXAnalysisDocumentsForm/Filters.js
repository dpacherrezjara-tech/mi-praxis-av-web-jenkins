Ext.define('Ext.Praxis.view.interline.TAXAnalysisDocumentsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-boxSearchFilter',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0 115',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            width: prototype.widthContenedor,
            defaults: {
                xtype: 'panel',
                anchor: '100%',
                border: true,
                width: '100%',
                layout: 'hbox',
                bodyStyle: 'background: transparent'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                {
                    defaults: {
                        padding: '5 1',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Group',
                            style: 'font-weight:bold;',
                            padding: '5 7',
                            width: 50
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:#9C1717;text-align:left;',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtGrupo',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 6,
                            width: 80,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtStatus',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Date',
                            style: 'font-weight:bold;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtInvDate',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Number',
                            style: 'font-weight:bold;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtInvoice',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Currency',
                            style: 'font-weight:bold;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCurrency',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Source',
                            style: 'font-weight:bold;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSource',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            readOnly: true,
                            padding: '5 7 5 1',
                            width: 65
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                {
                    defaults: {
                        padding: '5 1',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Airline',
                            style: 'font-weight:bold;',
                            padding: '5 1 5 7',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAirline',
                            fieldStyle: 'text-align:left;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 410
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Clearing',
                            style: 'font-weight:bold;',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtClearing',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Inv. Cpn',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Invoice Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQINV',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Total Miss',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Missing Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQMISS',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Fila 3">
                {
                    defaults: {
                        padding: '5 1',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ttl Match',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Match Coupons'
                            },
                            padding: '5 1 5 7',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQMATCH',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Only Tax',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Only Tax Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQOTAX',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Time Limit',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Limit Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQLIMIT',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'App. SPA',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'SPA Applies'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSPA',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Total Phy',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Physical Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQPHY',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Pnc. Gross',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Panic Gross Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQPGROSS',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Fila 4">
                {
                    defaults: {
                        padding: '5 1',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ttl Over',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Over Coupons'
                            },
                            padding: '5 1 5 7',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQOVER',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Total OW1',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total One Way Coupons 1'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQOW1',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Total RT1',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Round Trip Coupons 1'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRT1',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'No SPA',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total No SPA'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQNSPA',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Reviewed',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Reviewed Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQREV',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Pnc. Tax',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Panic Tax Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQPTAX',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Fila 5">
                {
                    defaults: {
                        padding: '5 1',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ttl Under',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Under Coupons'
                            },
                            padding: '5 1 5 7',
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQUNDER',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Total OW2',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total One Way Coupons 2'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQOW2',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Total RT2',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Round Trip Coupons 2'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRT2',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 3},
                        {xtype: 'tbspacer', width: 162},
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Pend.',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total Pending Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQPEND',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'label',
                            text: 'Total RM',
                            style: 'font-weight:bold;',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Total RM Coupons'
                            },
                            width: 80
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQRM',
                            fieldStyle: 'text-align:right;',
                            enableKeyEvents: true,
                            readOnly: true,
                            width: 65
                        }
                    ]
                },
                //</editor-fold>
                {
                    border: false,
                    defaults: {
                        anchor: '100%',
                        border: false
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="panel -> button(s)">
                        {
                            xtype: 'panel',
                            width: '21%',
                            height: '100%',
                            layout: {
                                type: 'hbox',
                                align: 'bottom'
                            },
                            bodyStyle: 'background-color: #FFFFFF;',
                            defaults: {
                                anchor: '21%',
                                bodyStyle: 'background-color: #FFFFFF;'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-imgOver',
                                    icon: 'resources/img/icon/32x32/salesNormal.png',
                                    tooltip: 'Go Over Module',
                                    border: false,
                                    width: 40,
                                    scale: 'large',
                                    listeners:{
                                        click: 'imgMasivo_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-imgUnder',
                                    icon: 'resources/img/icon/32x32/Under.png',
                                    tooltip: 'Go Under Module',
                                    border: false,
                                    width: 40,
                                    scale: 'large',
                                    listeners:{
                                        click: 'imgMasivo_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-imgQualityC',
                                    icon: 'resources/img/icon/32x32/qualityC.png',
                                    tooltip: 'Go Quality Control Module',
                                    border: false,
                                    width: 40,
                                    scale: 'large',
                                    listeners:{
                                        click: 'imgQualityC_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-imgSwap',
                                    icon: 'resources/img/icon/48x48/exchange.png',
                                    tooltip: 'Swap Data',
                                    border: false,
                                    width: 40,
                                    scale: 'large',
                                    listeners:{
                                        click: 'imgSwap_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-imgComments',
                                    icon: 'resources/img/icon/26x26/comments.png',
                                    tooltip: 'View Comments',
                                    border: false,
                                    width: 40,
                                    scale: 'large',
                                    listeners:{
                                        click: 'imgComments_clickHandler'
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        {
                            xtype: 'panel',
                            width: '80%',
                            layout: 'vbox',
                            bodyStyle: 'background-color: #FFFFFF;',
                            defaults: {
                                xtype: 'panel',
                                width: '80%',
                                border: true,
                                bodyStyle: 'background: #E3EAF9',
                                layout: 'hbox'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="cabecera">
                                {
                                    padding: '10px 4px 0px 10px',
                                    defaults: {
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">And/Or</strong>',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            padding: '2px 7px 2px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 130},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Field</strong>',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            padding: '2px 7px 2px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 115},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Condition</strong>',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            padding: '2px 7px 2px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Value</strong>',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            padding: '2px 7px 2px 0px'
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Select...',
                                            width: 70,
                                            padding: '4px 0px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo1',
                                            fieldStyle: 'text-align:left',
                                            width: 200,
                                            padding: '0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo1',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 200,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 270},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-imgInfo1',
                                            icon: 'resources/img/botones/16x16/information.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'View Fields',
                                            padding: '4px 0px 0px 0px',
                                            border: false,
                                            listeners: {
                                                click: 'imgInfo_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador1',
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 70,
                                            typeAhead: true,
                                            typeAheadDelay: 1,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue1',
                                            fieldStyle: 'text-align:left',
                                            width: 120,
                                            padding: '0',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-imgClear1',
                                            icon: 'resources/img/botones/clear.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'Clear Options',
                                            border: false,
                                            width: 40,
                                            scale: 'small',
                                            padding: '4px 0px 0px 0px',
                                            listeners:{
                                                click: 'imgClearQ_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbConector2',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["AND", "And"],
                                                    ["OR", "Or"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 70,
                                            typeAhead: true,
                                            typeAheadDelay: 1,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("AND");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("AND");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo2',
                                            fieldStyle: 'text-align:left',
                                            width: 200,
                                            padding: '0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo2',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 200,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 270},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-imgInfo2',
                                            icon: 'resources/img/botones/16x16/information.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'View Fields',
                                            padding: '4px 0px 0px 0px',
                                            border: false,
                                            listeners: {
                                                click: 'imgInfo_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador2',
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 70,
                                            typeAhead: true,
                                            typeAheadDelay: 1,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue2',
                                            fieldStyle: 'text-align:left',
                                            width: 120,
                                            padding: '0',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-imgClear2',
                                            icon: 'resources/img/botones/clear.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'Clear Options',
                                            border: false,
                                            width: 40,
                                            scale: 'small',
                                            padding: '4px 0px 0px 0px',
                                            listeners:{
                                                click: 'imgClearQ_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbConector3',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["AND", "And"],
                                                    ["OR", "Or"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 70,
                                            typeAhead: true,
                                            typeAheadDelay: 1,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("AND");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("AND");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo3',
                                            fieldStyle: 'text-align:left',
                                            width: 200,
                                            padding: '0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo3',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 200,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 270},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-imgInfo3',
                                            icon: 'resources/img/botones/16x16/information.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'View Fields',
                                            padding: '4px 0px 0px 0px',
                                            border: false,
                                            listeners: {
                                                click: 'imgInfo_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador3',
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 70,
                                            typeAhead: true,
                                            typeAheadDelay: 1,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue3',
                                            fieldStyle: 'text-align:left',
                                            width: 120,
                                            padding: '0',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-imgClear3',
                                            icon: 'resources/img/botones/clear.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'Clear Options',
                                            border: false,
                                            width: 40,
                                            scale: 'small',
                                            padding: '4px 0px 0px 0px',
                                            listeners:{
                                                click: 'imgClearQ_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbConector4',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["AND", "And"],
                                                    ["OR", "Or"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 70,
                                            typeAhead: true,
                                            typeAheadDelay: 1,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("AND");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("AND");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo4',
                                            fieldStyle: 'text-align:left',
                                            width: 200,
                                            padding: '0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo4',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 200,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 270},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-imgInfo4',
                                            icon: 'resources/img/botones/16x16/information.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'View Fields',
                                            padding: '4px 0px 0px 0px',
                                            border: false,
                                            listeners: {
                                                click: 'imgInfo_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador4',
                                            queryMode: 'local',
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 70,
                                            typeAhead: true,
                                            typeAheadDelay: 1,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 21},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue4',
                                            fieldStyle: 'text-align:left',
                                            width: 120,
                                            padding: '0',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-imgClear4',
                                            icon: 'resources/img/botones/clear.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'Clear Options',
                                            border: false,
                                            width: 40,
                                            scale: 'small',
                                            padding: '4px 0px 0px 0px',
                                            listeners:{
                                                click: 'imgClearQ_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    padding: '3px 4px 10px 10px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-imgInfo',
                                            icon: 'resources/img/botones/16x16/information.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'View Help Information',
                                            padding: '3px 0px 3px 0px',
                                            border: false,
                                            listeners: {
                                                click: 'imgInfoHelp_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 410},
                                        {
                                            xtype: 'label',
                                            text: '(*) Required Fields',
                                            labelSeparator: '',
                                            style: 'font-weight:bold;color:#B41717;',
                                            width: 150,
                                            padding: '3px 0px 3px 0px',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});