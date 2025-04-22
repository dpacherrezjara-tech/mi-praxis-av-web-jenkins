Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.DataEntryDetailMirror', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMerchantNumberDetailMirrorForm',
    requires: [
        'Ext.Praxis.controller.payments.MerchantNumber.DataEntryMerchantNumberDetailMirrorController'
    ],
    controller: 'DataEntryMerchantNumberDetailMirrorController',
    title: 'Merchant Number Mirror - Data Entry Detail Form',
    header: true,
    width: 1200,
    margin: '0 0 0 0',
    resizable: false,
    type: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            autoScroll: true,
            height: 670,
            width: 1200,
            defaults: {
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'form',
                    autoScroll: true,
                    defaults: {
                        textDecoration: 'underline',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel', 
                            bodyStyle: 'background: transparent;',
                            layout: 'vbox',
                            defaults: {
                                anchor: '100%'
                            },
                            autoScroll: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:white;',
                                    margin: '5 0 3 5',
                                    width: '100%',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'General Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 334,
                                            height: 20,
                                            margin: '4 200 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox', // Disposición vertical para incluir ambos sub-paneles
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;', // Fondo del panel principal
                                            style: 'border-radius:5px;', // Márgenes y esquinas redondeadas
                                            width: 1150, // Ajusta el ancho según sea necesario
                                            margin: '0 2 0 10',
                                            height: 68,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1150,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Merchant Nbr.',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                                            width: 35
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtMERCHN_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 16,
                                                            maskRe: /[0-9]/,
                                                            readOnly: false,
                                                            width: 155,
                                                            border: true,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Code AP',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-de-txtAPCODE_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 45,
                                                            valueField: 'VALUE',
                                                            displayField: 'NAME',
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        { xtype: 'tbspacer', width: 10 },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Mode Down. Report',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 140,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtDOWNREPORT_D',
                                                            fieldStyle: 'text-align:left',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 60,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Acquirer/Processor',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 135,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtACQPROC_D',
                                                            fieldStyle: 'text-align:left',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 30,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1150,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Branch Affiliate',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                                            width: 35
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtAFBRANCH_D',
                                                            fieldStyle: 'text-align:center; border-color: red;',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 16,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 155,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Date Init',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-DEFFEC',
                                                            fieldStyle: 'text-align:center; border-color: red;',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 16,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 18 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Date End',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 140,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-DFINAL',
                                                            fieldStyle: 'text-align:center; border-color: red;',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 16,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Secuence',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 135,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-SEQ',
                                                            fieldStyle: 'text-align:center; border-color: red;',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 16,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        { xtype: 'tbspacer', width: 10 },
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:white;',
                                    margin: '5 0 3 5',
                                    width: '100%',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Credit Card and Equivalent Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 334,
                                            height: 20,
                                            margin: '4 200 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox', // Disposición vertical para incluir ambos sub-paneles
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;', // Fondo del panel principal
                                            style: 'border-radius:5px;', // Márgenes y esquinas redondeadas
                                            width: '1150', // Ajusta el ancho según sea necesario
                                            margin: '0 2 0 10',
                                            height: 185,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    flex: 1,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            border: true,
                                                            bodyStyle: 'background: #E0F7FA;',
                                                            margin: '0 0 0 0',
                                                            height: 185,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Credit Card', // Título de la sección
                                                                    style: 'font-weight: bold; font-size: 16px; color: #333; text-align: center;margin-top:5px'
                                                                },
                                                                // Fila 1
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                    },
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent;', // Fondo transparente
                                                                    margin: '8 2 0 10',
                                                                    defaults: {
                                                                        anchor: '100%',
                                                                        width: 1150
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Franchise 1',
                                                                            style: 'font-weight:bold;color:#0B333C;',
                                                                            width: 140,
                                                                            margin: '3 0 0 0'
                                                                        },
                                                                        { xtype: 'tbspacer', width: 5 }, // Espaciador
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtFRANCH1_D',
                                                                            fieldStyle: 'text-align:center', // Alineación del texto
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 155,
                                                                            margin: '0 10 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Franchise 2',
                                                                            style: 'font-weight:bold;',
                                                                            width: 103
                                                                        },
                                                                        { xtype: 'tbspacer', width: 5 }, // Espaciador
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtFRANCH2_D',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130,
                                                                            margin: '0 10 0 0'
                                                                        }
                                                                    ]
                                                                },
                                                                // Fila 2
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        pack: 'center' // Centra los elementos horizontalmente
                                                                    },
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent;', // Fondo transparente
                                                                    margin: '8 2 0 10',
                                                                    defaults: {
                                                                        anchor: '100%',
                                                                        width: 1150
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Franchise 3',
                                                                            style: 'font-weight:bold;color:#0B333C;',
                                                                            width: 140,
                                                                            margin: '3 0 0 0'
                                                                        },
                                                                        { xtype: 'tbspacer', width: 5 }, // Espaciador
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtFRANCH3_D',
                                                                            fieldStyle: 'text-align:center', // Alineación del texto
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 155,
                                                                            margin: '0 10 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Franchise 4',
                                                                            style: 'font-weight:bold;',
                                                                            width: 103
                                                                        },
                                                                        { xtype: 'tbspacer', width: 5 }, // Espaciador
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtFRANCH4_D',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130,
                                                                            margin: '0 10 0 0'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            bodyStyle: 'background: #FFF3E0 ;',
                                                            margin: '0 0 0 0',
                                                            height: 185,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Equivalent',
                                                                    style: 'font-weight: bold; font-size: 16px; color: #333; text-align: center;margin-top:5px'
                                                                },
                                                                // Fila 1
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                    },
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent;', // Fondo transparente
                                                                    margin: '8 2 0 10',
                                                                    defaults: {
                                                                        anchor: '100%',
                                                                        width: 1150
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 1',
                                                                            style: 'font-weight:bold;', // Estilo personalizado
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_1',
                                                                            fieldStyle: 'text-align:center', // Alineación del texto
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'NAME',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130,
                                                                            margin: '0 10 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 2',
                                                                            style: 'font-weight:bold;',
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_2',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130
                                                                        }
                                                                    ]
                                                                },
                                                                // Fila 2
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                    },
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent;', // Fondo transparente
                                                                    margin: '8 2 0 10',
                                                                    defaults: {
                                                                        anchor: '100%',
                                                                        width: 1129
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 3',
                                                                            style: 'font-weight:bold;',
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_3',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130,
                                                                            margin: '0 10 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 4',
                                                                            style: 'font-weight:bold;', // Estilo personalizado
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_4',
                                                                            fieldStyle: 'text-align:center', // Alineación del texto
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130
                                                                        }
                                                                    ]
                                                                },
                                                                // Fila 3
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                    },
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent;', // Fondo transparente
                                                                    margin: '8 2 0 10',
                                                                    defaults: {
                                                                        anchor: '100%',
                                                                        width: 1129
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 5',
                                                                            style: 'font-weight:bold;',
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_5',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130,
                                                                            margin: '0 10 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 6',
                                                                            style: 'font-weight:bold;',
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_6',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130
                                                                        }
                                                                    ]
                                                                },
                                                                // Fila 4
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                    },
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent;', // Fondo transparente
                                                                    margin: '8 2 0 10',
                                                                    defaults: {
                                                                        anchor: '100%',
                                                                        width: 1129
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 7',
                                                                            style: 'font-weight:bold;', // Estilo personalizado
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_7',
                                                                            fieldStyle: 'text-align:center', // Alineación del texto
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130,
                                                                            margin: '0 10 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 8',
                                                                            style: 'font-weight:bold;',
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_8',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130
                                                                        },
                                                                    ]
                                                                },
                                                                // Fila 5
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                    },
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent;', // Fondo transparente
                                                                    margin: '8 2 0 10',
                                                                    defaults: {
                                                                        anchor: '100%',
                                                                        width: 1129
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Equivalent 9',
                                                                            style: 'font-weight:bold;',
                                                                            width: 135
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-de-txtEQUIVALENT_9',
                                                                            fieldStyle: 'text-align:center',
                                                                            enforceMaxLength: true,
                                                                            editable: false,
                                                                            enabled: false,
                                                                            valueField: 'CODE',
                                                                            displayField: 'CODE',
                                                                            maxLength: 45,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            readOnly: true,
                                                                            width: 130
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:white;',
                                    margin: '5 0 3 5',
                                    width: '100%',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Bank Section',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 334,
                                            height: 20,
                                            margin: '4 200 4 8'
                                        },
                                        
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox', // Disposición vertical para incluir ambos sub-paneles
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;', // Fondo del panel principal
                                            style: 'border-radius:5px;', // Márgenes y esquinas redondeadas
                                            width: 1150, // Ajusta el ancho según sea necesario
                                            margin: '0 2 0 10',
                                            height: 100,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1150,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Bank Code',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                                            width: 35
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-CODEBANK_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 4,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 155,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Bank Name',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-BANKNAM_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 50,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Bank Company',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 147,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-BANKCM_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 4,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Deposit Curr.',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 135,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-BANKCUR_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 3,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 120
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1150,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Acc. Number',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                                            width: 35
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-ACCNUMB_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 25,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 155,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Aux Bank Acc',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-ACCNUMA_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 6,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Acc. Numb Old',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 147,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-ACCNUMOLD_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 25,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Date Discount',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 135,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-DDISCON_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 8,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1080,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'ID Fiscal',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 145,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-IDFISCAL_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 20,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 155,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prof. Cent',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-BENCEN_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 8,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'ID B. Cen',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 147,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-IDFBENEF_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 8,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:white;',
                                    margin: '5 0 3 5',
                                    width: '100%',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Iata Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 334,
                                            height: 20,
                                            margin: '4 200 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox', // Disposición vertical para incluir ambos sub-paneles
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;', // Fondo del panel principal
                                            style: 'border-radius:5px;', // Márgenes y esquinas redondeadas
                                            width: 1150, // Ajusta el ancho según sea necesario
                                            margin: '0 2 0 10',
                                            height: 68,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1150,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Iata',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                                            width: 35
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-SAGENT_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 8,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 155,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Debt. SAP',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-DEUSAP_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 9,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Channel',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 147,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-CANAL_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 15,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Process',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 135,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-PROCES_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 40,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1150,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Country',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 145,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-SCOUNTRY_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 2,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 155,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Comp.',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-SOCIETY_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 4,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 147,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-SCURRENCY_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 3,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prof. Cent.',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 135,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-SBENCEN_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 8,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 130,
                                                            margin: '0 10 0 0'
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1080,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Cost. Cent.',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-COSTCEN_D',
                                                            fieldStyle: 'text-align:center',
                                                            enforceMaxLength: true,
                                                            editable: false,
                                                            enabled: false,
                                                            maxLength: 10,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            readOnly: false,
                                                            width: 155
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:white;',
                                    margin: '5 0 3 5',
                                    width: '100%',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Control Data',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 334,
                                            height: 20,
                                            margin: '4 200 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox', // Disposición vertical para incluir ambos sub-paneles
                                            border: false,
                                            bodyStyle: 'background:#f0f0f0;', // Fondo del panel principal
                                            style: 'border-radius:5px;', // Márgenes y esquinas redondeadas
                                            width: 1150, // Ajusta el ancho según sea necesario
                                            margin: '0 2 0 10',
                                            height: 68,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1080,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Creator User',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 145,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtUSCR_D',
                                                            readOnly: true,
                                                            width: 155,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            },
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Creation Date',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtFECR_D',
                                                            readOnly: true,
                                                            width: 130,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            },
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Creation Time',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 147,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtHOCR_D',
                                                            readOnly: true,
                                                            width: 130,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background:#f0f0f0;', // Fondo de los sub-paneles
                                                    style: 'border-radius: 5px;', // Bordes redondeados de los sub-paneles
                                                    margin: '8 2 0 10',
                                                    width: 1080,
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 400
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'User Update',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 145,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtUSUP_D',
                                                            readOnly: true,
                                                            width: 155,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            },
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Update Date',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 110,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtFEUP_D',
                                                            readOnly: true,
                                                            width: 130,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            },
                                                            margin: '0 10 0 0'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Update Time',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            width: 147,
                                                            margin: '3 0 0 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtHOUP_D',
                                                            readOnly: true,
                                                            width: 130,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save_D',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick_D'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update_D',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick_D'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete_D',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick_D'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel_D',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick_D'
                    }
                }
            ]
        }
    ]
}
);