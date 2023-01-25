Ext.define('Ext.Praxis.view.payments.UnmatchedTransactionsForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.UnmatchedTransactionsForm',
    requires:[
        'Ext.Praxis.controller.payments.UnmatchedTransactions.DataEntryUnmatchedTransactionsController'
    ],
    controller: 'DataEntryUnmatchedTransactionsController',
    title:'Ticket - Data Entry Form',
    header:true,
    height:710,
    width:950,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    autoScroll: true,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
//                style: 'margin: 1px;',
                textDecoration: 'underline',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    autoScroll: true,
                    width:930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Ticket Number">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Ticket Number',
                                        style: 'font-weight:bold;color:#0B333C;',
                                        width: 90,
                                        autoEl: {
                                            tag: 'label',
                                            'data-qtip': 'CCIA(3)+FORMA(4)+SERIE(6)+CUPON (1)'
                                        }
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'textfield',
                                        id:prototype.id+'-de-txtTicket',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        maxLength: 14,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Sequence',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 75,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 3 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSEQ',
                                        fieldStyle: 'text-align:center',
//                                        enforceMaxLength: true,
                                        readOnly: true,
//                                        maxLength: 1,
                                        width: 40
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Document Type',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'combo',
                                        id: prototype.id+'-de-cmbTDOC',
                                        fieldStyle: 'color:#074066;',
                                        width: 90,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false,
//                                        disabled: true
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Source',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 50,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 6 },
                                    {
                                        xtype: 'combobox',
                                        id: prototype.id+'-de-cmbFTE',
                                        fieldStyle: 'color:#074066;',
                                        width: 90,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false,
//                                        disabled: true
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Status',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 40,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'combobox',
                                        id: prototype.id+'-de-cmbSTVAL',
                                        fieldStyle: 'color:#074066;',
                                        width: 142,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false,
//                                        disabled: true
                                    }
                                ]
                            },
                            // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Sales Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            bodyStyle: 'background:#efe5e5',
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '2 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Sales Information</strong>',
    //                                    bodyStyle: 'background:#efe5e5',
                                        bodyStyle: 'background:#E5ECEF;',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 120,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 80},
                                    {
                                        xtype: 'label',
                                        text: 'Card Code',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 25},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    { xtype: 'tbspacer', width: 3 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSCARCOD',
                                        fieldStyle: 'text-align:left',
//                                        enforceMaxLength: true,
//                                        maxLength: 6,
//                                        maskRe: /[0-9, */]/,
                                        padding: '3 0',
                                        readOnly: true,
                                        width: 330
                                    },
                                    { xtype: 'tbspacer', width: 249}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Load Date">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            bodyStyle: 'background:#efe5e5',
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '0 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Load Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSDATEL',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Load Type',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 80,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 38},
                                    {
                                        xtype: 'combobox',
                                        id: prototype.id+'-de-cmbSFLOAD',
                                        fieldStyle: 'color:#074066;',
                                        width: 93,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false,
//                                        disabled: true
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Country',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSCOUNTRY',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 2,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Agent',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 27 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSAGENT',
                                        fieldStyle: 'text-align:left; background:#CDA79F',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 100
                                    },
                                    { xtype: 'tbspacer', width: 10}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Sales Date">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            bodyStyle: 'background:#efe5e5',
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '1 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Sales Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSDATE',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Payment Type',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 110,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSPAYMENT',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 2,
                                        readOnly: true,
                                        width: 93
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Authoriz. Code',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSAUTHOC',
                                        fieldStyle: 'text-align:right',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Contracting Card',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 120,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSTCNTR',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 4,
                                        readOnly: true,
                                        width: 100
                                    },
                                    { xtype: 'tbspacer', width: 10}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Card Nbr">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
    //                            bodyStyle: 'background:#efe5e5',
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '1 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Card Nbr',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 65,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 2},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSCARDN',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 16,
                                        readOnly: true,
                                        width: 103
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Expiration Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 110,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSDATEXP',
                                        fieldStyle: 'text-align:left; background:#CDA79F',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        readOnly: true,
                                        width: 93
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'PNR',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSPNR',
                                        fieldStyle: 'text-align:right; background:#CDA79F',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Transaction Code',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 120,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtTRNCU',
                                        fieldStyle: 'text-align:right',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        readOnly: true,
                                        width: 100
                                    },
                                    { xtype: 'tbspacer', width: 10}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Amount">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
    //                            bodyStyle: 'background:#efe5e5',
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '1 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Amount',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSVFOP',
                                        fieldStyle: 'text-align:right; background:#CDA79F',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 15,
                                        readOnly: true,
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 8},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSCURRENCY',
                                        fieldStyle: 'text-align:center',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 3,
                                        readOnly: true,
                                        width: 50
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'label',
                                        text: 'Invoice',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 54,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSINVN',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 14,
                                        readOnly: true,
                                        width: 93
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Invoice Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSIDATE',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 250}
                                ]
                            },
                            // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="ACCB Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#efe5e5',
                                margin: '6 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">ACCB Information</strong>',
                                        bodyStyle: 'background:#efe5e5',
                                        style: 'font-weight:bold;text-decoration: underline;',
                                        id: prototype.id+'-de-lblACCBTitulo',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 140,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 80},
                                    {
                                        xtype: 'label',
                                        text: 'Card Code',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 25},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    { xtype: 'tbspacer', width: 3 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtACARCOD',
                                        fieldStyle: 'text-align:left',
//                                        enforceMaxLength: true,
//                                        maxLength: 6,
//                                        maskRe: /[0-9, */]/,
                                        padding: '3 0',
                                        readOnly: true,
                                        width: 330
                                    },
                                    { xtype: 'tbspacer', width: 229}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Load Date">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#efe5e5',
                                margin: '0 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Load Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtADATEL',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Load Type',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 80,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 38},
                                    {
                                        xtype: 'combobox',
                                        id: prototype.id+'-de-cmbAFLOAD',
                                        fieldStyle: 'color:#074066;',
                                        width: 93,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false,
//                                        disabled: true
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Country',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtACOUNTRY',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 2,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Agent',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 27 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtAAGENT',
                                        fieldStyle: 'text-align:left; background:#CDA79F',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 100
                                    },
                                    { xtype: 'tbspacer', width: 10}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Sales Date">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#efe5e5',
                                margin: '1 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Sales Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtADATE',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Payment Type',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 110,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtAPAYMENT',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 2,
                                        readOnly: true,
                                        width: 93
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Authoriz. Code',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtAAUTHOC',
                                        fieldStyle: 'text-align:right',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Contracting Card',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 120,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtATCNTR',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 4,
                                        readOnly: true,
                                        width: 100
                                    },

                                    { xtype: 'tbspacer', width: 10}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Card Nbr">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '1 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Card Nbr',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 60,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 7},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtACARDN',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
//                                        enforceMaxLength: true,
//                                        maxLength: 8,
                                        readOnly: true,
                                        width: 103
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Expiration Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 110,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtADATEXP',
                                        fieldStyle: 'text-align:left; background:#CDA79F',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        readOnly: true,
                                        width: 93
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'PNR',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtAPNR',
                                        fieldStyle: 'text-align:left; background:#CDA79F',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 250}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Amount">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '1 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Amount',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: '(*)',
                                        style: 'font-weight:bold;color:red;',
                                        width: 20
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtAVFOP',
                                        fieldStyle: 'text-align:right; background:#CDA79F',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 15,
                                        readOnly: true,
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 8},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtACURRENCY',
                                        fieldStyle: 'text-align:center',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 3,
                                        readOnly: true,
                                        width: 50
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'label',
                                        text: 'Invoice',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 54,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtAINVN',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 14,
                                        readOnly: true,
                                        width: 93
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Invoice Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtAIDATE',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 250}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Merchant Nbr">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '1 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Merchant Nbr',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 90,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtMERCHN',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 20,
                                        readOnly: true,
                                        width: 219
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Sequence Nbr',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 90,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 2},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSEQNUM',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
//                                        enforceMaxLength: true,
//                                        maxLength: 2,
                                        readOnly: true,
                                        width: 134
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Sequence Count',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtSEQCOUNT',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 2,
                                        readOnly: true,
                                        width: 107
                                    },
                                    { xtype: 'tbspacer', width: 106}
                                ]
                            },
                            // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Match Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '6 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Match Information</strong>',
                                        bodyStyle: 'background:#E5ECEF;',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 664}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Comment">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '0 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Comment',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtComment',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 60,
                                        readOnly: true,
                                        width: 548
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Conciliation Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 120,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtDATEC',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 100
                                    },
                                    { xtype: 'tbspacer', width: 10 }
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Error">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '1 2 2 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Error',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 50,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 50},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtError',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        maxLength: 2,
                                        readOnly: true,
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtDescError',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        maxLength: 150,
                                        readOnly: true,
                                        width: 370
                                    },
                                    {xtype: 'tbspacer', width: 11},
                                    {
                                        xtype: 'label',
                                        text: 'Flag Bank',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 80,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 34},
                                    {
                                        xtype: 'combobox',
                                        id: prototype.id+'-de-cmbFNOBANK',
                                        fieldStyle: 'color:#074066;',
                                        width: 204,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false,
//                                        disabled: true
                                    },
                                    {xtype: 'tbspacer', width: 10}
                                ]
                            },
                            // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Settlement Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '4 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Settlement Information</strong>',
    //                                    bodyStyle: 'background:#e5efe7',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 665 }
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Load Date">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
    //                            hidden: true,
                                bodyStyle: 'background:#efe5e5',
                                margin: '0 2 4 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Load Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 27},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtDATEF',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 20,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Load Date Praxis',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 110,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtTDATE',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 20,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 491}
                                ]
                            },
                            // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Banks Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '2 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Banks Information</strong>',
                                        bodyStyle: 'background:#E5ECEF;',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 665}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Load Date">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '0 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Load Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 70,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtBDATEL',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'label',
                                        text: 'Status',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 50,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 68},
                                    {
                                        xtype: 'combobox',
                                        id: prototype.id+'-de-cmbBSTVAL',
                                        fieldStyle: 'color:#074066;',
                                        width: 93,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false,
//                                        disabled: true
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Payment Date',
                                        style: 'font-weight:bold;color:#121E31;',
                                        margin: '0 0 0 3',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtBDATEP',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 90
                                    },
                                    { xtype: 'tbspacer', width: 10 },
                                    {
                                        xtype: 'label',
                                        text: 'Payment Status',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    { xtype: 'tbspacer', width: 30 },
                                    {
                                        xtype: 'combobox',
                                        id: prototype.id+'-de-cmbBSTVALP',
                                        fieldStyle: 'color:#074066;',
                                        width: 102,
                                        valueField: 'code',
                                        queryMode: 'local',
                                        displayField: 'name',
                                        readOnly: true,
                                        editable: false
//                                        disabled: true
                                    },
                                    { xtype: 'tbspacer', width: 10}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Rejection Code">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                margin: '1 2 4 5',
                                bodyStyle: 'background:#E5ECEF;',

                                items: [
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Rejection Code',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 93,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 4 },
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtCREJEC',
                                        fieldStyle: 'text-align:right',
//                                        enforceMaxLength: true,
//                                        maxLength: 15,
                                        margin: '0 0 0 3',
                                        readOnly: true,
                                        width: 310
                                    },
                                    { xtype: 'tbspacer', width: 70 },
                                    {
                                        xtype: 'checkboxfield',
                                        id: prototype.id+'-chkFADYEN',
                                        boxLabel: 'ADYEN',
                                        checked: false,
                                        width: 90
//                                        listeners:{
//                                            change: 'btnSearch_click'
//                                        }
                                    },
                                    { xtype: 'tbspacer', width: 329 }
                                ]
                            },
                            // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Phases Conciliation Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
//                                bodyStyle: 'background:#E5ECEF;',
                                bodyStyle: 'background:#efe5e5',
                                margin: '2 2 0 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Phases Conciliation Information</strong>',
                                        bodyStyle: 'background:#E5ECEF;',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 665}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Conciliation Date 2nd Phase">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
//                                bodyStyle: 'background:#E5ECEF;',
                                bodyStyle: 'background:#efe5e5',
                                margin: '0 8 14 5',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Conciliation Date 2nd Phase',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 170,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtDATEC2',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 110
                                    },
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'label',
                                        text: 'Conciliation Date 3nd Phase',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 170,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtDATEC3',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
                                        readOnly: true,
                                        width: 110
                                    },
                                    { xtype: 'tbspacer', width: 276}
                                ]
                            }
                            // </editor-fold>
                    ]
                },
                
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    html: '<strong style="color:#121E31; text-decoration: underline; ">Control Information</strong>',
                    textDecoration: 'underline',
                    height: 70,
//                    fontSize: '5',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '15 2 2 10'
                     
                },
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 50',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border:false,
                            layout: 'hbox',
                            margin: '1 0 0 50',
                            
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '0 0 0 0',
//            layout:{
//                pack: 'center'
//            },
            fieldStyle: 'text-align:left',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                },
                {
//                    text: 'Cancel',
                    id:prototype.id+'-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png'
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                },
                {
//                    text: 'Cancel',
                    id:prototype.id+'-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png'
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                }
            ]
        }
    ]
  }
);