Ext.define('Ext.Praxis.view.payments.TourismConciliationForm.DataEntryTourism', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTourismConciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.TourismConciliation.DataEntryTourismConciliationController'
    ],
    controller: 'DataEntryTourismConciliationController',
    title: 'Tourism Conciliation - Data Entry Form',
    header: true,
    height: 920,
    width: 1310,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            height: 950,
            width: 1310,
            scrollable: true,
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '0 20 3 10',
                            width: 1310,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
//                                {
//                                    xtype: 'label',
//                                    text: 'General Information',
//                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
//                                    bodyStyle: 'background:#E5ECEF;',
//                                    fontSize: '11',
//                                    width: 334,
//                                    height: 20,
//                                    margin: '4 200 4 8'
//                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    bodyStyle: 'background:#efe5e5;',
//                                    margin: '0 2 0 20',
//                                    defaults: {
//                                        anchor: '100%',
//                                        width: 1120
//                                    },
//                                    items: [
//                                        {xtype: 'tbspacer', width: 7, height: 24},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Processing Date',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtPRDA',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 100,
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Merchant ID',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtMERCHID',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 100,
//                                        },
//                                        {xtype: 'tbspacer', width: 70},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Agent',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 90
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtSAGENT',
//                                            fieldStyle: 'text-align:left',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 180,
//                                        },
//                                        {xtype: 'tbspacer', width: 70},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Terminal',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 90
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtTERMI',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 130,
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                    ]
//                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    bodyStyle: 'background:#efe5e5;',
//                                    margin: '0 2 0 20',
//                                    items: [
//                                        {xtype: 'tbspacer', width: 7, height: 24},
//                                        {
//                                            xtype: 'label',
//                                            text: 'ID Submission',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtIDITEMS',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 100
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Inst.Pay. Plan',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtINSTPLA',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 100
//                                        },
//                                        {xtype: 'tbspacer', width: 70},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Country',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 90
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtCOUNTRY',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 180
//                                        },
//                                        {xtype: 'tbspacer', width: 70},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Business',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 90
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtNEGOC',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 130
//                                        },
//                                        {xtype: 'tbspacer', width: 10}
//                                    ]
//                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    bodyStyle: 'background:#efe5e5;',
//                                    margin: '0 2 0 20',
//                                    items: [
//                                        {xtype: 'tbspacer', width: 7, height: 24},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Invoice Ref.Nbr',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtINVORNBR',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 100
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Zone',
//                                            hidden: true,
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 120
//                                        },
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtZONE',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            hidden: true,
//                                            width: 100
//                                        },
//                                        {
//                                            xtype: 'label',
//                                            text: 'Inst. Payment',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtINSTPAY',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 100
//                                        },
//                                        {xtype: 'tbspacer', width: 70},
//                                        {
//                                            xtype: 'label',
//                                            text: 'ID Transaction',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 90
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtIDITEMT',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 180
//                                        },
//                                        {xtype: 'tbspacer', width: 70},
//                                        {
//                                            xtype: 'label',
//                                            text: 'Processor',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            width: 90
//                                        },
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtCOREP',
//                                            fieldStyle: 'text-align:center',
//                                            enforceMaxLength: true,
//                                            readOnly: true,
//                                            width: 130
//                                        },
//                                        {xtype: 'tbspacer', width: 10}
//                                    ]
//                                },





                                {
                                    xtype: 'label',
                                    text: 'Sales Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    width: 334,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Sales Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBSUMDATE',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Doc. Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTDOC',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Agent',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBANDOC',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSTATUS',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 120
                                        }
                                    ]
                                },

                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Invoice',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtPAYDATE',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Qty trans.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCARCODE',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Doc.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCARDN',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtAmountTouris',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 120
                                        }

                                    ]
                                },

                                {
                                    xtype: 'label',
                                    text: 'Adjust Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    width: 334,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Coment',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtComentSAUTHOC',
                                            readOnly: false,
                                            fieldStyle: 'text-align:center;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtComentAdjust',
                                            readOnly: false,
                                            fieldStyle: 'text-align:center;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'total Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtComentAdjustSum',
                                            readOnly: false,
                                            fieldStyle: 'text-align:center;',
                                            width: 120
                                        },
                                        

                                    ]
                                },
                                
                                {xtype: 'tbspacer', width: 10},
                                
                                               {
                                    xtype: 'label',
                                    text: 'Nueva Grilla',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    width: 334,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },

                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [

                                        /// aqui empeiza




                                        
                                              
                                            
                                        
                                                // termina
                                    ]
                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    id: prototype.id + '-PanelGridAndComments',
//                                    margin: '10 0 10 200',
//                                    items: [
//                                        {
//                                            xtype: 'tbspacer',
//                                            width: 60,
//                                            margin: '30 30 0 30',
//                                            id: prototype.id + '-vacioComment',
//                                        },
//                                        
//                                        {
//                                            xtype: 'panel',
//                                            layout: 'vbox',
//                                            border: false,
//                                            margin: '0 0 0 0',
//                                            items: [
//                                                {
//                                                    xtype: 'panel',
//                                                    layout: 'hbox',
//                                                    border: false,
//                                                    margin: '10 0 10 0',
//                                                    id: prototype.id + '-PanelComments',
//                                                    hidden: true,
//                                                    height: 30,
//                                                    width: 592,
//                                                    bodyStyle: 'background:#efe5e5;',
//                                                    items: [
//                                                        {
//                                                            xtype: 'label',
////                                                            style: 'font-weight:bold;color:#0B333C;',
//                                                            margin: '5 0 0 10',
//                                                            text: 'BPO Comment:',
//                                                            width: 90
//                                                        },
//                                                        {xtype: 'tbspacer', width: 5},
//                                                        {
//                                                            xtype: 'label',
//                                                            text: '(*)',
//                                                            margin: '5 2 0 0',
//                                                            id: prototype.id + '-COMENT_Forced',
//                                                            hidden: true,
//                                                            style: 'font-weight:bold;color:red;',
//                                                            width: 20
//                                                        },
//                                                        {
//                                                            xtype: 'combo',
//                                                            id: prototype.id + '-cmbCOMENT',
//                                                            margin: '5 0 0 0',
//                                                            style: 'font-weight:bold;color:#0B333C;',
//                                                            fieldStyle: 'text-align:left;',
//                                                            queryMode: 'local',
//                                                            triggerAction: 'all',
//                                                            valueField: 'CODE',
//                                                            displayField: 'NAME',
//                                                            width: 460,
//                                                            labelWidth: 10,
//                                                            hidden: false,
//                                                            hiddenLabel: false
//                                                        },
//                                                    ]
//                                                },
//                                                
//                                                
//                                            ]
//                                        },
//                                    ]
//                                },

                                //CONTAIN
                                {
                                    xtype: 'container',
                                    id: prototype.id + '-containerPanelScan',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            hidden: true,
                                            margin: '0 2 0 20',
                                            bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 7, height: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Reverse Policy',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFREVERSA',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Reverse ADM',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFREVADM',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'ADM',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtFADM',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Void',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtVOID',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 145},
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Scan',
                                            id: prototype.id + '-labelScan',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                            bodyStyle: 'background:#E5ECEF;',
                                            fontSize: '11',
                                            width: 234,
                                            height: 15,
                                            margin: '4 2 4 8'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelScan',
                                            layout: 'hbox',
                                            hidden: true,
                                            border: false,
                                            margin: '0 2 0 100',
                                            bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    xtype: 'label',
                                                    text: 'Reset Scan',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 1 1 1',
                                                    icon: 'resources/img/icon/48x48/exchange.png',
                                                    tooltip: 'Reset',
                                                    listeners: {
                                                        click: 'resetScan_keyDownHandler'
                                                    }

                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-chkBlocked',
                                                    boxLabel: '<b>Blocked</b>',
                                                    checked: false,
                                                    width: 90,
                                                    listeners: {
                                                        change: 'cambiarGrillaChk'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'MSI Tracking',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-update',
                                                    //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                    tooltip: 'MSI Tracking',
                                                    listeners: {
                                                        click: 'msiTracking_keyDownHandler'
                                                    }

                                                },
                                                //150
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Adj. Pago Duplicado',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 130
                                                },
                                                {xtype: 'tbspacer', width: 2},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-add',
                                                    //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                    tooltip: 'Add Adjustment',
                                                    listeners: {
                                                        click: 'addAdjustment_keyDownHandler'
                                                    }

                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panelBpo',
                                                    layout: 'hbox',
                                                    hidden: true,
                                                    border: false,
                                                    bodyStyle: 'background:#efe5e5;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Bpo Rev.',
                                                            textAlign: 'center',
                                                            style: 'font-weight:bold;color:#0B333C;',
                                                            margin: '4 4 4 4',
                                                            width: 70
                                                        },
                                                        {xtype: 'tbspacer', width: 2},
                                                        {
                                                            xtype: 'button',
                                                            width: 25,
                                                            id: prototype.id + '-openBpoObserv',
                                                            //margin: '4 4 4 4',
                                                            //iconCls: 'prx-icon-add',
                                                            icon: 'resources/img/botones/facsimil.png',
                                                            tooltip: 'BPO Rev.',
                                                            listeners: {
                                                                click: 'bpoRev_keyDownHandler'
                                                            }

                                                        },
                                                        {xtype: 'tbspacer', width: 2},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-closeBpoObserv',
                                                            hidden: true,
                                                            width: 25,
                                                            //margin: '4 4 4 4',
                                                            //iconCls: 'prx-icon-add',
                                                            icon: 'resources/img/botones/cancel.png',
                                                            tooltip: 'Close BPO Rev.',
                                                            listeners: {
                                                                click: 'closeBpoRev_keyDownHandler'
                                                            }

                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 5},
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelScanCard',
                                            layout: 'hbox',
                                            hidden: true,
                                            border: false,
                                            margin: '0 2 0 20',
                                            bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 7, higth: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'Add Ticket',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-input-txtTKTScan1',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:center;',
                                                    width: 100,
                                                    maskRe: /[0-9]/,
                                                    enforceMaxLength: true,
                                                    maxLength: 13,
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Add C. Card',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtCard11',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 6,
                                                    width: 100,
                                                    enableKeyEvents: true,
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'label',
                                                    text: '*****(*)',
                                                    padding: '3 0',
                                                    width: 65,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtCard22',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 4,
                                                    width: 65,
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Authorization',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtApproval',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    //                                            maskRe: /[0-9]/,
                                                    maxLength: 6,
                                                    width: 85,
                                                    enableKeyEvents: true,
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-txtFromDateSDATE',
                                                    text: 'Sales Date',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtFromDate',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Format valid YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-add',
                                                    tooltip: 'Add',
                                                    listeners: {
                                                        click: 'addCreditCard_keyDownHandler'
                                                    }

                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-clear',
                                                    tooltip: 'Clean',
                                                    style: {
                                                        background: '#EFE5E5'
                                                    },
                                                    listeners: {
                                                        click: 'clear_keyDownHandler'
                                                    }

                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    id: prototype.id + '-btnClearCustom',
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-image-trash',
                                                    tooltip: 'Clean Detail',

                                                    listeners: {
                                                        click: 'clear_tableNormal'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    id: prototype.id + '-btnRefresh',
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-refresh',
                                                    tooltip: 'Refresh Detail',

                                                    listeners: {
                                                        click: 'allRefreshDataEntryAMDP'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 119},
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelScanCard_2',
                                            layout: 'hbox',
                                            hidden: true,
                                            border: false,
                                            margin: '0 2 0 20',
                                            bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 7, hight: 24},
                                                {
                                                    xtype: 'label',
                                                    text: 'PNR',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtScanPNR',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    maskRe: /[a-zA-Z0-9]/,
                                                    maxLength: 6,
                                                    width: 100,
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Agent',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtScanSAGENT',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9/]/,
                                                    maxLength: 8,
                                                    width: 100,
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Card Code',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
//                                                {
//                                                    xtype: 'combo',
//                                                    id: prototype.id + '-cmbSCARCOD',
//                                                    style: 'font-weight:bold;color:#0B333C;',
//                                                    fieldStyle: 'text-align:left;',
//                                                    queryMode: 'local',
//                                                    triggerAction: 'all',
//                                                    valueField: 'CODE',
//                                                    displayField: 'NAME',
//                                                    width: 220,
//                                                    labelWidth: 10,
//                                                    hiddenLabel: false,
//                                                    editable: false
//                                                },
                                                {
                                                    xtype: 'combo',
//                                                    fieldLabel: 'Select Items',
                                                    id: prototype.id + '-cmbSCARCOD',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:left;',
                                                    valueField: 'CODE',
                                                    displayField: 'NAME',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    filterPickList: true,
                                                    width: 220,
                                                    editable: false,
                                                    multiSelect: true,
                                                    forceSelection: true,

                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Consol.',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtSCONSOL',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9/]/,
                                                    maxLength: 8,
                                                    width: 100,
                                                },
                                                {xtype: 'tbspacer', width: 245},
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelAdjustment',
                                            layout: 'hbox',
                                            hidden: true,
                                            border: false,
                                            margin: '0 0 0 20',
                                            bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: 'Adj Ticket',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-input-txtAdjTKTScan1',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:center;',
                                                    width: 100,
                                                    maskRe: /[0-9]/,
                                                    enforceMaxLength: true,
                                                    maxLength: 13,
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-add',
                                                    tooltip: 'Add',
                                                    listeners: {
                                                        click: 'addAdjTicket_keyDownHandler'
                                                    }

                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelBpoObserv',
                                            layout: 'hbox',
                                            hidden: true,
                                            border: false,
                                            margin: '0 2 0 100',
                                            bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'BPO Observation',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 120
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtBpoOBSERV-RO',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:left;',
                                                    enforceMaxLength: true,
                                                    readOnly: false,
                                                    maxLength: 50,
                                                    width: 320,
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelMsiTracing',
                                            layout: 'hbox',
                                            hidden: true,
                                            border: false,
                                            margin: '0 2 0 2',
                                            bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    text: 'MSI Tracking',
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-update',
                                                    //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                    tooltip: 'MSI Tracking',
                                                    listeners: {
                                                        click: 'msiTracking_keyDownHandler'
                                                    }

                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'label',
                                                    text: 'Reverse Match',
                                                    id: prototype.id + '-labelReverse',
                                                    hidden: true,
                                                    textAlign: 'center',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    //margin: '4 4 4 4',
                                                    iconCls: 'prx-icon-image-log',
                                                    id: prototype.id + '-btnReverse',
                                                    hidden: true,
                                                    //icon: 'resources/img/botones/16x16/1384382451_window_new.png',
                                                    tooltip: 'Reverse match',
                                                    listeners: {
                                                        click: 'reverseMatch_keyDownHandler'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Adjustment',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-CODADJU',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:left;',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    maxLength: 50,
                                                    width: 200,
                                                },
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'label',
                                                    text: 'Observation',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    margin: '4 4 4 4',
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtOBSERV-RO',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:left;',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    maxLength: 50,
                                                    width: 320,
                                                },
                                            ]
                                        },
//                                        {
//                                            xtype: 'panel',
//                                            layout: 'hbox',
//                                            border: false,
//                                            width: 1205,
//                                            margin: '0 0 0 20',
////                                            bodyStyle: 'background: transparent',
////                                            width: 1225,
////                                            bodyStyle: 'background:#e0e0e0;',
//                                            bodyStyle: 'background:#e0e0e0; border-radius: 10px 10px 0 0;',
//                                            items: [
//                                                {
//                                                    xtype: 'label',
//                                                    text: 'Date',
//                                                    style: 'font-weight:bold;color:#0B333C;',
//                                                    width: 80,
//                                                    margin: '0 0 0 780',
//                                                },
//                                                {xtype: 'tbspacer', width: 5},
//                                                {
//                                                    xtype: 'textfield',
//                                                    id: prototype.id + '-de-txtDATECI',
//                                                    fieldStyle: 'text-align:center',
//                                                    enforceMaxLength: true,
//                                                    readOnly: true,
//                                                    width: 100
//                                                },
//                                                {xtype: 'tbspacer', width: 5},
//                                                {
//                                                    xtype: 'label',
//                                                    text: 'Transaction',
//                                                    style: 'font-weight:bold;color:#0B333C;',
//                                                    width: 80
//                                                },
//                                                {xtype: 'tbspacer', width: 5},
//                                                {
//                                                    xtype: 'textfield',
//                                                    id: prototype.id + '-de-txtTRANCI',
//                                                    fieldStyle: 'text-align:center',
//                                                    enforceMaxLength: true,
//                                                    readOnly: true,
//                                                    width: 100
//                                                },
//                                            ]
//                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '0 0 0 0',
                                            width: 1225,
                                            //bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    id: prototype.id + '-tabMain',
                                                    deferredRender: true,
                                                    width: 1225,
                                                    border: false,
                                                    //                                            height: 182, //820
                                                    //                                            anchor: '100%',
                                                    margin: '0 0 1 20',
                                                    autoScroll: true,
                                                    bodyStyle: 'background: transparent',
                                                    items: [

                                                        {
                                                            xtype: 'panel',
                                                            //                                                    id: prototype.id + '-SalesAnalysis_tab',
                                                            title: 'Normal',
                                                            listeners: {
                                                                activate: 'onWindowNormal'
                                                            },

                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    hidden: true,
                                                                    id: prototype.id + '-panelDataInfoScan',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    width: 1209,
                                                                    //                                                            height: 180,
                                                                    hidden: false,
                                                                    autoScroll: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'grid',
                                                                            id: prototype.id + '-gridDataInfoScan',
                                                                            width: 1207,
                                                                            height: 300,
                                                                            columnLines: true,
                                                                            plugins: [
                                                                                {
                                                                                    ptype: 'cellediting',
                                                                                    clicksToEdit: 1
                                                                                }
                                                                            ],
                                                                            columns: {
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: true,
                                                                                    align: 'center'
                                                                                },
                                                                                items: [
                                                                                    {text: 'Status', dataIndex: 'STVAL', width: 75,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            value = 'Match';
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            if (record.data.STVAL === '1') {
                                                                                                value = 'Match'
                                                                                            } else if (record.data.STVAL === '5') {
                                                                                                value = 'Match manual.'
                                                                                            } else {
                                                                                                value = 'Open'
                                                                                            }
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 75,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            if (record.data.TDOC === 'S') {
                                                                                                value = 'Sales';
                                                                                            } else if (record.data.TDOC === 'A') {
                                                                                                value = 'Adjust';
                                                                                            }
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: 'Agent', dataIndex: 'SAGENT', width: 90,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            return value;
                                                                                        }
                                                                                    },

                                                                                    {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 90, id: prototype.id + '-gridA720FECVTA',
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            return value;
                                                                                        }
                                                                                    },

                                                                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            return value;
                                                                                        }
                                                                                    },

                                                                                    {
                                                                                        text: 'Credit Card',
                                                                                        defaults: {
                                                                                            menuDisabled: true,
                                                                                            sortable: false,
                                                                                            align: 'center'
                                                                                        },
                                                                                        columns: [

                                                                                            {text: 'Number', dataIndex: 'SCARDN', width: 200,
                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = "text-align:center;";
                                                                                                    if (record.data.TDOC === 'A') {
                                                                                                        metaData.style += "background-color:#bff5bf;";
                                                                                                    }
                                                                                                    return value;
                                                                                                }
                                                                                            },
                                                                                            {sortable: true, text: 'Author.<br>Code', dataIndex: 'SAUTHOC', width: 65,
                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = "text-align:center;";
                                                                                                    if (record.data.TDOC === 'A') {
                                                                                                        metaData.style += "background-color:#bff5bf;";
                                                                                                    }
                                                                                                    return value;
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    },

                                                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 130,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                            return value;
                                                                                        }
                                                                                    },

                                                                                    {text: 'Curr', dataIndex: 'SCURRENCY', width: 65,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: 'Tourist reconciliation date', dataIndex: 'DATECT', width: 177, id: prototype.id + '-columnINVOICE',
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            return value;
                                                                                        },
                                                                                    },
                                                                                    {text: 'Invoice', dataIndex: 'REFER', width: 145, id: prototype.id + '-columnACCNUMA',
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            metaData.tdAttr = record.data.COSTCEN != '' && record.data.COSTCEN != undefined ? 'data-qtip="' + "Cost Center: " + record.data.COSTCEN + '"' : '';

                                                                                            return value;
                                                                                        },
                                                                                    },
//                                                                                    {text: 'CFUENTE', dataIndex: 'CFUENTE', width: 75, hidden: true,
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            if (record.data.TDOC === 'A') {
//                                                                                                metaData.style += "background-color:#bff5bf;";
//                                                                                            }
//                                                                                            return value;
//                                                                                        }
//                                                                                    }


                                                                                ]
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', height: 2},
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            id: prototype.id + '-panelADJ',
                                                                            border: false,
                                                                            hidden: true,
                                                                            margin: '0 2 0 20',
                                                                            //                                                                    bodyStyle: 'background:#efe5e5;',
                                                                            items: [
                                                                                {xtype: 'tbspacer', width: 30},
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Adjustment Type',
                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                    width: 120
                                                                                },
                                                                                {xtype: 'tbspacer', width: 10},
                                                                                {
                                                                                    xtype: 'combo',
                                                                                    id: prototype.id + '-cmbADJTYPE',
                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    queryMode: 'local',
                                                                                    triggerAction: 'all',
                                                                                    valueField: 'CODE',
                                                                                    displayField: 'NAME',
                                                                                    width: 180,
                                                                                    labelWidth: 10,
                                                                                    hidden: false,
                                                                                    hiddenLabel: false
                                                                                },
                                                                                {
                                                                                    xtype: 'combo',
                                                                                    id: prototype.id + '-de-txtCCUSTCC',
                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    queryMode: 'local',
                                                                                    triggerAction: 'all',
                                                                                    valueField: 'CODE',
                                                                                    displayField: 'NAME',
                                                                                    width: 180,
                                                                                    labelWidth: 10,
                                                                                    hidden: true,
                                                                                    hiddenLabel: false
                                                                                },
                                                                                {xtype: 'tbspacer', width: 30},
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Observation',
                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                    hidden: true,
                                                                                    width: 100
                                                                                },
                                                                                {xtype: 'tbspacer', width: 10},
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-de-txtOBSERV',
                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    enforceMaxLength: true,
                                                                                    maxLength: 50,
                                                                                    hidden: true,
                                                                                    width: 320,
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-de-txtIN_FREGLA',
                                                                                    style: 'font-weight:bold;color:#0B333C;',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    enforceMaxLength: true,
                                                                                    maxLength: 1,
                                                                                    hidden: true,
                                                                                    width: 50,
                                                                                },
                                                                                {xtype: 'tbspacer', width: 50},
                                                                            ]
                                                                        },
                                                                        {xtype: 'tbspacer', height: 2},
                                                                        {
                                                                            xtype: 'grid',
                                                                            id: prototype.id + '-gridDataAdjustment',
                                                                            width: 1207,
                                                                            height: 60,
                                                                            hidden: true,
                                                                            columnLines: true,
                                                                            //margin: '0 2 0 100',
                                                                            plugins: [
                                                                                {
                                                                                    ptype: 'cellediting',
                                                                                    clicksToEdit: 1
                                                                                }
                                                                            ],
                                                                            hideHeaders: true,
                                                                            columns: {
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: true,
                                                                                    align: 'center'
                                                                                },
                                                                                items: [
                                                                                    {text: 'Status', dataIndex: 'STMANUAL', width: 70,
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            value = 'Adjustment';
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 60,
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            value = 'Adj.';
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: 'Agent', dataIndex: 'A720AGENTE', width: 70,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 75, id: prototype.id + '-gridAdjA720FECVTA',
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
//                                                                                    {text: 'PNR', dataIndex: 'A720PNR', width: 63,
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        }
//                                                                                    },
                                                                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 63,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            if (record.data.TDOC === 'A') {
                                                                                                metaData.style += "background-color:#bff5bf;";
                                                                                            }
                                                                                            return value;
                                                                                        }
                                                                                    },
//                                                                                    {text: 'Ticket', dataIndex: 'A1531TKT', width: 110,
//                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                            metaData.style = "text-align:center;";
//                                                                                            return value;
//                                                                                        },
//                                                                                        editor: {xtype: 'textfield', editable: false},
//                                                                                    },
                                                                                    {
                                                                                        text: 'Credit Card',
                                                                                        defaults: {
                                                                                            menuDisabled: true,
                                                                                            sortable: false,
                                                                                            align: 'center'
                                                                                        },
                                                                                        columns: [

                                                                                            {text: 'Number', dataIndex: 'SCARDN', width: 130,
                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = "text-align:center;";
                                                                                                    return value;
                                                                                                }
                                                                                            },
                                                                                            {text: 'Authorization', dataIndex: 'SAUTHOC', width: 65,
                                                                                                editor: {xtype: 'textfield', editable: false},
                                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = "text-align:center;";
                                                                                                    return value;
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    },

                                                                                    {header: 'Amount', dataIndex: 'SVFOP', width: 85, xtype: 'gridcolumn',
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background-color:#F0FA8F";
                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                            return value;
                                                                                        },
                                                                                        listeners: {
                                                                                            click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
                                                                                                meDE.gridAdjustmentRowIndex = rowNum;
                                                                                            },
                                                                                        },
                                                                                        editor: {
                                                                                            xtype: 'textfield',
                                                                                            editable: true,
                                                                                            allowBlank: false,
                                                                                            enableKeyEvents: true,
                                                                                            maskRe: /[0-9\.-]/,
                                                                                            selectOnFocus: true,
                                                                                            listeners: {
                                                                                                /*blur: function (field, e, eOpts) {
                                                                                                 var newVal = field.getValue().trim();
                                                                                                 field.setValue(newVal);
                                                                                                 meDE.refreshValuesAdjustment(self, e, eOpts);
                                                                                                 }*/
                                                                                                specialkey: 'eventKeyAdjustment',
                                                                                            }
                                                                                        },
                                                                                    },
                                                                                    {text: 'Sales<br>Amount', dataIndex: 'SVFOPC', width: 92, id: prototype.id + '-gridAdjTot_VFOPs',
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;";
                                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: 'Curr', dataIndex: 'NETO', width: 45,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: '', dataIndex: '', width: 142,
                                                                                        editor: {xtype: 'textfield', editable: false},
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                    {text: '', dataIndex: '', width: 40,
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return '';
                                                                                        }
                                                                                    },
                                                                                    {text: '', dataIndex: '', width: 40,
                                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:center;";
                                                                                            return '';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            }
                                                                        }

                                                                    ],

                                                                },
                                                            ],

                                                        },
                                                    ]
                                                },
                                                        //                                       
                                            ]
                                        },

                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '0 0 0 265',
                                            id: prototype.id + '-panelSumAmount',
                                            //bodyStyle: 'background:#efe5e5;',
                                            items: [
                                                {xtype: 'tbspacer', width: 460},
                                                {
                                                    xtype: 'label',
                                                    text: 'Sum Amount:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSumAmount',
                                                    fieldStyle: 'text-align:right',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 90
                                                },
                                                {xtype: 'tbspacer', width: 30},
                                                {
                                                    xtype: 'label',
                                                    text: 'Qty Tkt:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-QtyTkt',
                                                    fieldStyle: 'text-align:right',
                                                    enforceMaxLength: true,
                                                    readOnly: true,
                                                    width: 90,
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="ControlData">
                        {
                            xtype: 'label',
                            text: 'Control Data',
                            fontSize: '11',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            width: 180,
                            margin: '8 2 4 19'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '0 2 0 30',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '8 2 4 2',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Creator User ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120,
                                            height: 20
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSCR',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Creation Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFECR',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Creation Time',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOCR',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    margin: '8 2 4 2',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'User Update',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUSUP',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Update Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFEUP',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Update Time',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHOUP',
                                            readOnly: true,
                                            width: 100,
                                            listeners: {
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
                            hidden: true,
                            text: 'Save',
                            id: prototype.id + '-btn-save',
                            iconCls: 'prx-icon-save',
                            listeners: {
                                click: 'onSaveClick'
                            }
                        },
                        {
                            hidden: true,
                            text: 'Update',
                            id: prototype.id + '-btn-update',
                            iconCls: 'prx-icon-update',
                            listeners: {
                                click: 'onUpdateClick'
                            }
                        },
                        {
                            hidden: true,
                            text: 'Delete',
                            id: prototype.id + '-btn-delete',
                            iconCls: 'prx-icon-delete',
                            listeners: {
                                click: 'onDeleteClick'
                            }
                        },
                        {
                            hidden: true,
                            text: 'Reverse Match',
                            id: prototype.id + '-btn-reverse',
                            iconCls: 'prx-icon-delete',
                            listeners: {
                                click: 'onReverseClick'
                            }
                        },
                        {
                            text: 'Cancel',
                            id: prototype.id + '-btn-cancel',
                            iconCls: 'prx-icon-cancel',
                            listeners: {
                                click: 'onCancelClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
);