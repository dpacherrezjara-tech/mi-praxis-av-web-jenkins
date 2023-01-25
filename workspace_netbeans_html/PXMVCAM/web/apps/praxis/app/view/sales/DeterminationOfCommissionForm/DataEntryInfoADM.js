var widthWindow = 1530;
Ext.define('Ext.Praxis.view.sales.DeterminationOfCommissionForm.DataEntryInfoADM',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInfoADMDeterminationOfCommissionForm',
    requires:[
        'Ext.Praxis.controller.sales.DeterminationOfCommission.DataEntryInfoADMDeterminationOfCommissionController'
    ],
    controller: 'DataEntryInfoADMDeterminationOfCommissionController',
    title:'Single Format',
    header:true,
    height:930,
    width:widthWindow,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    bodyStyle: 'background: #E3EAEF;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title:'<b style="font-size:13px;">&nbsp;AGENCY DEBIT MEMO / NOTA DE CARGO&nbsp;</b>',
                            layout: 'vbox',
                            style: 'background: #E3EAEF;border-style:solid;border-color:#000000;"',
                            border: true,
                            margin: '4 2 4 2',
                            padding: '4 0 4 0',
                            defaults: {
                                anchor: '100%',
                                width: widthWindow-50
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'                        
                                    },
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 1 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype : 'image',
                                            src : 'resources/img/botones/16x16/Aeromexico.jpg',
                                            mode : 'image',
                                            width: 285,
                                            height: 63
                                        },
                                        { xtype: 'tbspacer', width: 182 },
                                        {
                                            xtype: 'label',
                                            text: 'Memo Number: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtAmtAdm1',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 58 },
                                        {
                                            xtype: 'label',
                                            text: 'Issue Date: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 90
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtDateEmi',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 150
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype : 'image',
                                            id:prototype.id+'-imgformUni',
                                            src : 'resources/img/botones/24x24/pdf_48.png',
                                            mode : 'image',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Export Single Format to PDF'
                                                    });
                                                },
                                                el: {
                                                    click: function() {
                                                        window.alert("Message 1");
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype : 'image',
                                            id:prototype.id+'-imgArc',
                                            src : 'resources/img/botones/24x24/pdf_ASR_BSP.png',
                                            hidden: true,
                                            mode : 'image',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Export Format Arc to PDF '
                                                    });
                                                },
                                                el: {
                                                    click: function() {
                                                        window.alert("Message 2");
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype : 'image',
                                            id:prototype.id+'-imgAsr',
                                            src : 'resources/img/botones/24x24/pdf_ASR_BSP.png',
                                            hidden: true,
                                            mode : 'image',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Export Format Asr to PDF '
                                                    });
                                                },
                                                el: {
                                                    click: function() {
                                                        window.alert("Message 3");
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'                        
                                    },
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 1 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'History: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 200 },
                                        {
                                            xtype: 'label',
                                            text: 'Check Detail: ',
                                            style: 'font-weight:bold;color:#323232;font-size:13px;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 50 },
                                        {
                                            xtype: 'label',
                                            text: 'Transaction: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTxt',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'label',
                                            text: 'Source and Channel: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 147
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtSource',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 150
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 1 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Accepted: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblEmitidoFecha',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblEmitidoUsuario',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 30 },
                                        {
                                            xtype : 'image',
                                            src : 'resources/img/botones/16x16/swap.png',
                                            mode : 'image',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Check Detail'
                                                    });
                                                }
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 94 },
                                        {
                                            xtype: 'label',
                                            text: 'Ticket Number: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTickets',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype : 'image',
                                            src : 'resources/img/botones/16x16/swap.png',
                                            mode : 'image',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Mostrar los Documentos Relacionados'
                                                    });
                                                }
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 55 },
                                        {
                                            xtype: 'label',
                                            text: 'Coupon: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 60
                                        },
                                        { xtype: 'tbspacer', width: 17 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCupon1',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 150
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 1 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Issued: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblSentFecha',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblSentUsuario',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 140 },
                                        {
                                            xtype: 'label',
                                            text: 'Ticket Date: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtDateTickets',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 25 },
                                        {
                                            xtype: 'label',
                                            text: 'Transaction TKT: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTrx',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 150
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 1 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'CTA',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblCTA',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:right;',
                                            enforceMaxLength: true,
                                            maxLength: 29,
                                            readOnly: true,
                                            width: 205
                                        },
                                        { xtype: 'tbspacer', width: 140 },
                                        {
                                            xtype: 'label',
                                            text: 'IATA Number: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtNumberIata',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 45 },
                                        {
                                            xtype: 'label',
                                            text: 'IATA Name: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtName',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 150
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 6">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 1 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'CARGO GESTION: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblCargoGest',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;',
//                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 245 },
                                        {
                                            xtype: 'label',
                                            text: 'Address: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtAddress',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 402
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'label',
                                            text: 'provisions: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 85
                                        },
                                        {
                                            xtype : 'image',
                                            src : 'resources/img/botones/16x16/swap.png',
                                            mode : 'image',
                                            listeners: {
                                                afterrender: function(c) {
                                                    Ext.create('Ext.tip.ToolTip', {
                                                        target: c.getEl(),
                                                        html: 'Check Detail provisions'
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 7">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 1 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'IVA CARGO: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblIVACARGO',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;',
//                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 245 },
                                        {
                                            xtype: 'label',
                                            text: 'Pass Name: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPass',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 402
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 8">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-Observation',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    border: false,
                                    hidden: true,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '4 0 0 0',
                                        padding: '4 0 1 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Obsevation: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 120
                                        },
                                        { xtype: 'tbspacer', width: 5 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txaObserva',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;',
                                            readOnly: true,
                                            width: 490
                                        }
                                    ]
                                },
                                // </editor-fold>
                                { xtype: 'tbspacer', height: 4 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: true,
                            margin: '4 2 4 2',
                            padding: '4 0 4 0',
                            bodyStyle: 'background: #E3EAEF;border-style:solid;border-color:#000000;"',
                            defaults: {
                                anchor: '100%',
                                width: widthWindow-50
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'fieldset',
                                            title:'<b style="font-size:13px;">&nbsp;CALCULATED AIRLINE (DETAIL)&nbsp;</b>',
                                            style: 'background: #E3EAEF;border-style:solid;border-color:#000000;"',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center',
                                                pack: 'center'
                                            },
                                            border: true,
                                            margin: '4',
                                            padding: '4',
                                            width: 910,
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridDataDetalle">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataDetalle',
                                                    width: 898,
                                                    height: 100,
                                                    border: true,
                                                    columnLines: true,
                                                    bodyStyle: 'background: transparent;',
                                                    align: 'center',
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'From', dataIndex: 'A1580FROM', width: 80
                                                            },
                                                            {
                                                                text: 'To', dataIndex: 'A1580TO', width: 60
                                                            },
                                                            {
                                                                text: 'Route x Comp.', dataIndex: 'A1580RUTAC', width: 130,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Clase', dataIndex: 'A1580CLASE', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'FareBasis', dataIndex: 'A1580FBASI', width: 130,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Calculated Airline(Detail)',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Tarifa', dataIndex: 'A1580FMIOR', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Q´s', dataIndex: 'A1580QMIOR', width: 60,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total Fare', dataIndex: 'TotalFare', width: 130,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Charges', dataIndex: 'A1580CHAMI', width: 75,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total TKT', dataIndex: 'TotalTKT', width: 90,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'fieldset',
                                            title:'<b style="font-size:13px;">&nbsp;ISSUE REASON&nbsp;</b>',
                                            style: 'background: #E3EAEF;border-style:solid;border-color:#000000;"',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center',
                                                pack: 'center'
                                            },
                                            border: true,
                                            margin: '4',
                                            padding: '4',
                                            width: 510,
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gvwInc">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gvwInc',
                                                    width: 492,
                                                    height: 100,
                                                    border: true,
                                                    columnLines: true,
                                                    bodyStyle: 'background: transparent;',
                                                    align: 'center',
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Codigo', dataIndex: 'A2548CODR1', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Family', dataIndex: 'A2548CODR2', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Description', dataIndex: 'A2548EMISION', width: 320, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:left;font-weight:normal;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.A2548EMISION+'"';
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
                                {xtype: 'tbspacer', height: 7},
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblCodeError',
                                            fieldStyle: 'background:white;color:#F72307;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            hidden: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 20 },
                                        {
                                            xtype: 'label',
                                            text: 'Tour Code: ',
                                            style: 'font-weight:bold;color:#323232;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTourCode',
                                            fieldStyle: 'background:white;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 150
                                        },
                                        {xtype: 'tbspacer', width: 600},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblCodeError2',
                                            fieldStyle: 'background:white;color:#F72307;font-weight:bold;text-align:left;border-style:solid;border-color:#2C6B97;',
                                            hidden: true,
                                            readOnly: true,
                                            width: 100
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', height: 20}
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title:'<b style="font-size:13px;">&nbsp;CALCULATED DIFFERENCES&nbsp;</b>',
                            style: 'background: #E3EAEF;border-style:solid;border-color:#000000;"',
                            layout: 'vbox',
                            border: true,
                            margin: '4 2 4 2',
                            padding: '4 0 4 0',
                            defaults: {
                                anchor: '100%',
                                width: widthWindow-50
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Currency: </strong>',
                                            padding: '4 0 4 0'
                                        },
                                        {xtype: 'tbspacer', width: 195},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Calculated Airline: </strong>',
                                            padding: '4 0 4 0'
                                        },
                                        {xtype: 'tbspacer', width: 280},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Calculated AGENT: </strong>',
                                            padding: '4 0 4 0'
                                        },
                                        {xtype: 'tbspacer', width: 280},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Difference: </strong>',
                                            padding: '4 0 4 0'
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblCur',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 150
                                        },
                                        {xtype: 'tbspacer', width: 60},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Fare</strong>',
                                            padding: '4 0 4 0',
                                            width: 45
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTarifa1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Fare</strong>',
                                            padding: '4 0 4 0',
                                            width: 45
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTarifa2',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Fare</strong>',
                                            padding: '4 0 4 0',
                                            width: 45
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTarifa3',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-PRIMERO_TAX',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {xtype: 'tbspacer', width: 262, id: prototype.id+'-lbl_primer', hidden: false},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblCodeError3',
                                            fieldStyle: 'background:white;color:#F72307;font-weight:bold;text-align:center;border-style:solid;border-color:#2C6B97;',
                                            hidden: true,
                                            readOnly: true,
                                            width: 255
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="gridDataTax">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataTax',
                                            width: 1052,
                                            height: 100,
                                            border: true,
                                            columnLines: true,
                                            bodyStyle: 'background: transparent;',
                                            align: 'center',
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Calculated Airline',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tax', dataIndex: 'A1673CDTAX', width: 175
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'A1673TXMIA', width: 175,//editable="true"
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Calculated Agent',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tax', dataIndex: 'A1673CDTAX', width: 175//editable="false"
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'A1673TXORI', width: 175,//editable="false"
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Difference',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tax', dataIndex: 'A1673CDTAX', width: 175//editable="false"
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'A1673TXDIF', width: 175,//editable="false"
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 6},
                                // <editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 132},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Total Tax: </strong>',
                                            padding: '4 0 4 0',
                                            width: 128
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTotalFare1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTotalFareAgen1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTotalFareDife1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 132},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Services charges: </strong>',
                                            padding: '4 0 4 0',
                                            width: 128
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTotalCargo1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTotalCargoAgen1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTotalCargoDife1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 6">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 132},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Iva(charge): </strong>',
                                            padding: '4 0 4 0',
                                            width: 128
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-ChargeAero',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-ChargeAgent',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-Chargediferen',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 7">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 132},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Commission: </strong>',
                                            padding: '4 0 4 0',
                                            width: 128
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblComi1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblComiAgen1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblComiDife1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 8">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 132},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Over Commission: </strong>',
                                            padding: '4 0 4 0',
                                            width: 128
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblOverAreo',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblOverAgent',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblOverDifere',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 9">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 132},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Tax on Commission: </strong>',
                                            padding: '4 0 4 0',
                                            width: 128
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTaxOnCom',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTaxOnComAgen1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        },
                                        {xtype: 'tbspacer', width: 125},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblTaxOnComDife1',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 10">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 940},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="font-weight:bold;color:#323232;">Amount Pay: </strong>',
                                            padding: '4 0 4 0',
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-lblFareArelo',
                                            value: '',
                                            fieldStyle: 'color:#244066;background:white;font-weight:bold;text-align:right;border-style:solid;border-color:#2C6B97;',
                                            readOnly: true,
                                            width: 265
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', height: 3},
                                // <editor-fold defaultstate="collapsed" desc="Fila 11">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-CAMPOS_HIDDEN',
                                    hidden: true,
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCNXPA',
                                            value: '',
                                            hidden: true,
                                            width: 90
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-txtAmtPais',
                                            hidden: true,
                                            padding: '4 0 4 0',
                                            width: 49
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-txtAmtTRNCU',
                                            hidden: true,
                                            padding: '4 0 4 0',
                                            width: 49
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-txtAmtCNXPA',
                                            hidden: true,
                                            padding: '4 0 4 0',
                                            width: 49
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-txtpreme',
                                            hidden: true,
                                            padding: '4 0 4 0',
                                            width: 49
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-txttipo',
                                            hidden: true,
                                            padding: '4 0 4 0',
                                            width: 49
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-txtSource1',
                                            hidden: true,
                                            padding: '4 0 4 0',
                                            width: 49
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-txtA2548FLAG',
                                            hidden: true,
                                            padding: '4 0 4 0',
                                            width: 49
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
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    xtype: 'button',
                    html: '<b style="color:#2B333C;font-size:14px;">Close<b>',
                    id:prototype.id+'-btnClose',
                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                    border: true,
                    width: 130,
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});