Ext.define('Ext.Praxis.view.payments.InputsDesignForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInputsDesignForm',
    requires: [
        'Ext.Praxis.controller.payments.InputsDesign.DataEntryInputsDesignController'
    ],
    controller: 'DataEntryInputsDesignController',
    title: 'LAYOUTS INPUTS - Data Entry Form',
    header: true,
    height: 568,
    width: 1550,
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
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 1530,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1380
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Layouts Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                    width: 500,
                                    height: 25
                                },
                                {xtype: 'tbspacer', width: 534}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 180
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'PROGRAM ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCPROGRAM',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 4,
                                    readOnly: false,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'NAME ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNPROGRAM',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'REFERENCE ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDELILNK',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 60,
                                    readOnly: false,
                                    width: 200
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'SCOUNTRY',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCOUNTRY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSCOUNTRY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'CODEBANK',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODEBANK',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRCODEBANK',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'PRDA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPRDA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRPRDA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'TRAN',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTRAN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTRAN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'TDOC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTDOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTDOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'SDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbRSDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    width: 130,
                                    labelWidth: 10,
                                    editable: false,
                                    hidden: false,
                                    hiddenLabel: false
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkRSDATE',
//                                    boxLabel: 'A',
                                    checked: false,
                                    width: 20,
                                    margin: '0 0 0 5',
                                    listeners: {
                                        change: 'ChangeBox'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'ADATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtADATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbRADATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    width: 130,
                                    editable: false,
                                    labelWidth: 10,
                                    hidden: false,
                                    hiddenLabel: false
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkRADATE',
//                                    boxLabel: 'A',
                                    checked: false,
                                    width: 20,
                                    margin: '0 0 0 5',
                                    listeners: {
                                        change: 'ChangeBox'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'SAGENT',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAGENT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSAGENT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'MERCHAND',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHAND',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRMERCHAND',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'TERMI',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTERMI',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTERMI',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'SCARCOD',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARCOD',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSCARCOD',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SCARDN',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARDN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSCARDN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SCARDNCOR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARDNCOR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSCARDNCOR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SAUTHOC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSAUTHOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SPNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSPNR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSPNR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'SDATEXP',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSDATEXP',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSDATEXP',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'TIPOTAR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTIPOTAR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTIPOTAR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'RED',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRED',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRRED',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'ACCNUMBER',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtACCNUMBER',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRACCNUMBER',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'CCIA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCCIA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRCCIA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'FORMA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFORMA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRFORMA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SERIE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSERIE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSERIE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SCURRENCY',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'SALEVAL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSALEVAL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSALEVAL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SVFOP',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSVFOP',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRSVFOP',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'IVA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIVA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRIVA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'PROPINA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPROPINA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRPROPINA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'TOTAL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTOTAL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTOTAL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'COMISION',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCOMISION',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRCOMISION',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'BASEFUE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBASEFUE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRBASEFUE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'RTEFUE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTEFUE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRRTEFUE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'RTEIVA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTEIVA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRRTEIVA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'BASICA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBASICA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRBASICA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'RTEICA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRTEICA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRRTEICA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'NETO',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNETO',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRNETO',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 20,
                                    readOnly: false,
                                    width: 150
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'FLOAD',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFLOAD',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'LDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtLDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'TDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'SORIG',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSORIG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: true,
                                    maxLength: 2,
                                    readOnly: false,
                                    width: 50
                                },
                            ]
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {xtype: 'tbspacer', heigth: 105},
                {
                    xtype: 'label',
                    text: 'Control Data',
                    height: 100,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                    width: 234,
                    margin: '4 10 4 35'
                },

                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 10 50',
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
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
                            margin: '5 0 10 50',

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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
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
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
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
);