Ext.define('Ext.Praxis.view.payments.RejectionReportForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryRejectionReportForm',
    requires:[
        'Ext.Praxis.controller.payments.RejectionReport.DataEntryRejectionReportController'
    ],
    controller: 'DataEntryRejectionReportController',
    title:'Send Email',
    header:true,
    height:520,
    width:700,
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
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Fila 1">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'To:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtMailTO',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 140,
                                    maskRe: /[a-zA-Z0-9\ s]/,
//                                    readOnly: true,
                                    width: 580
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
                        // <editor-fold defaultstate="collapsed" desc="Fila 2">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Cc:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
//                                    id:prototype.id+'-txtEmailCcp',
                                    id:prototype.id+'-txtMailCC',
                                    enforceMaxLength: true,
                                    maxLength: 140,
                                    maskRe: /[a-zA-Z0-9\ s]/,
//                                    readOnly: true,
                                    width: 580,
                                    fieldStyle: 'background:white;color:black;text-align:left;'
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
                        // <editor-fold defaultstate="collapsed" desc="Fila 3">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Subject:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 75
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
//                                    id:prototype.id+'-txtAsunto',
                                    id:prototype.id+'-txtMailAsunto',
                                    enforceMaxLength: true,
                                    maxLength: 140,
                                    maskRe: /[a-zA-Z0-9\ s]/,
//                                    readOnly: true,
                                    width: 580,
                                    fieldStyle: 'background:white;color:black;text-align:left;'
                                }
                            ]
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 5 },
                        // <editor-fold defaultstate="collapsed" desc="Fila 4">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'textarea',
                                    id: prototype.id+'-txtMensaje',
                                    value: '\nEstimados(s):\n\nAnexo envío del archivo con el detalle de las transacciones rechazadas por filtros.\n\nAgradeciendo su atención, quedo a sus órdenes.\nSaludos\n\n\n\n',
                                    readOnly: true,
                                    fieldStyle: 'background:white;color:0B333C;',
                                    height: 168,
                                    width: 660
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'textarea',
//                                    id: prototype.id+'-txtMensajea',
                                    id: prototype.id+'-txtCopyright',
                                    value: 'Este mensaje y sus anexos son propiedad de Aerovías de México, S.A. de C.V. (y/o sus respectivas afiliadas\ny subsidiarias) y contiene información que puede ser confidencial, protegida por el secreto profesional u otros\nprivilegios, o protegida por derechos de propiedad intelectual u otros derechos. Si usted recibió este mensaje\npor equivocación se le notifica que no está autorizado para imprimirlo, copiarlo, reenviarlo y/o archivarlo\ny que dichos actos podrían ser ilegales. Si usted recibió este correo por error, por favor notifique\n inmediatamente al remitente y destruya el mensaje original y sus archivos adjuntos sin imprimirlos,\ncopiarlos, reenviarlos y/p archivarlos. Aunque hemos tomado ciertas precauciones para evitar que éste correo\nelectrónico y sus anexos contengan virus, es responsabilidad del destinatario asegurarse que ese sea el caso.',
                                    readOnly: true,
                                    style: 'font-size:50px ;font-weight:bold;color:#332D84;',
                                    fieldStyle: 'font-size: 11.7px; font-weight: bold; background: #E3EAF9',
                                    height: 145,
                                    width: 660
                                }
                            ]
                        }
                        // </editor-fold>
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
                    text: 'Send',
                    id:prototype.id+'-btn-send',
                    icon: 'resources/img/botones/24x24/Forward.png',
                    listeners:{
                        click: 'set_sendReporte'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});