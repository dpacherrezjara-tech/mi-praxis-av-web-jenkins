/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AgentsMasterFileForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.AgentsMasterFile.DataEntryAgentsMasterFileController'
    ],
    title: 'Agent Complete Information',
    header: true,
    width: 850,
    height: 700,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-tabDataEntry',
                    width: 830,
                    height: 610,
                    anchor: '100%',
                    margin: '10 10 10 10',
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #E3EAF9',
                            id: prototype.id + 'panel1',
                            title: 'General Information',
                            layout: 'vbox',
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '10 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003KEY',
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Code   </strong><strong style="color:#B56166;font-size:13px;"> (*) </strong>',
                                            width: 180,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '5px 10px 0px 5px',
                                            maxLength: 8,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cboA003CANAL',
                                            fieldLabel: '<strong style="color:#000;">Channel </strong><strong style="color:#B56166;font-size:13px;">(*)</strong>',
                                            padding: '5px 10px 0px 5px',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 100,
                                            width: 200,
                                            listeners: {
                                                change: 'cmbChangeChannel'
                                            }

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cboA003TIPO',
                                            fieldLabel: '<strong style="color:#000;">Of Type </strong><strong style="color:#B56166;font-size:13px;">(*)</strong>',
                                            padding: '5px 10px 0px 5px',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 100,
                                            width: 200

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003SABCTY',
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Sabre City </strong>',
                                            width: 140,
                                            labelWidth: 70,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '5px 10px 0px 5px',
                                            maxLength: 5,
                                            enforceMaxLength: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 150,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;  ">Legal Name</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#B56166;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003KEY3',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 370,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cboA003PAIS',
                                            fieldLabel: '<strong style="color:#000;">Service Type </strong>',
                                            padding: '5px 10px 0px 5px',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 100,
                                            width: 200

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 150,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;  ">Commercial Name</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#B56166;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003KEY1',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 420,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003INDICA',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Indicator </strong>',
                                            width: 150,
                                            labelWidth: 100,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px',
                                            maxLength: 1,
                                            enforceMaxLength: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 150,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Country</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#B56166;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003PSALF',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 30,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 2,
                                            enforceMaxLength: true,
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003KEY2',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Tax Id </strong>',
                                            width: 150,
                                            labelWidth: 50,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px',
                                            maxLength: 10,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003IATA',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Main Office </strong>',
                                            width: 190,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 30px',
                                            maxLength: 15,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003ANEXO',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">A.Accounting </strong>',
                                            width: 155,
                                            labelWidth: 85,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px',
                                            maxLength: 7,
                                            enforceMaxLength: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Address</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003DIREC1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 255,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 40,
                                            enforceMaxLength: true,
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">City</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#B56166;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CIUDAD',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 50,
                                            value: '',
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px',
                                            maxLength: 3,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003DISTRI',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">District</strong>',
                                            width: 210,
                                            labelWidth: 60,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 30px',
                                            maxLength: 15,
                                            enforceMaxLength: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Address 2</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003DIREC2',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 255,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 40,
                                            enforceMaxLength: true,
                                            padding: '1px 5px 5px 5px'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Province</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003PROVIN',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 180,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 50,
                                            enforceMaxLength: true,
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 70,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">County</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003DEPART',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px',
                                            maxLength: 50,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003REFER',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Reference</strong>',
                                            width: 280,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 20px',
                                            maxLength: 50,
                                            enforceMaxLength: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Zipcode</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003ZIPCOD',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 5,
                                            enforceMaxLength: true,
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 70,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Phone(s)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003TELEF',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 5px',
                                            maxLength: 200,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Fax</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FAX',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 60,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            padding: '1px 5px 5px 20px',
                                            maxLength: 15,
                                            enforceMaxLength: true
                                        }

                                    ]
                                }
                                , {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            padding: '1px 5px 0px 10px',
                                            html: '<strong style="color:#000;">Email</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003MAIL',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 640,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 120,
                                            enforceMaxLength: true,
                                            padding: '1px 5px 5px 5px'
                                        },
                                    ]
                                }
                                , {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E3EAF9',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    width: 300,
                                                    padding: '10px 5px 5px 10px',
                                                    html: '<strong style="color:#000; text-decoration:underline">Contact Information</strong>'

                                                },
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    width: 120,
                                                    padding: '1px 5px 5px 10px',
                                                    html: '<strong style="color:#000; ">Contact #1</strong>'

                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA003CONTA1',
                                                    required: true,
                                                    disabled: false,
                                                    fieldLabel: '',
                                                    width: 250,
                                                    labelWidth: 0,
                                                    labelAlign: 'center',
                                                    fieldStyle: ' text-align:left ',
                                                    maxLength: 40,
                                                    enforceMaxLength: true,
                                                    padding: '1px 5px 5px 10px',
                                                },
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    width: 120,
                                                    padding: '1px 5px 5px 10px',
                                                    html: '<strong style="color:#000; ">Contact #2</strong>'

                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA003CONTA2',
                                                    required: true,
                                                    disabled: false,
                                                    fieldLabel: '',
                                                    width: 250,
                                                    labelWidth: 0,
                                                    labelAlign: 'center',
                                                    fieldStyle: ' text-align:left ',
                                                    maxLength: 40,
                                                    enforceMaxLength: true,
                                                    padding: '1px 5px 5px 10px'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E3EAF9',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    width: 400,
                                                    padding: '1px 5px 0px 10px',
                                                    html: '<strong style="color:#000; text-decoration:underline">Control Information</strong>'

                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            width: 80,
                                                            padding: '10px 5px 0px 10px',
                                                            html: '<strong style="color:#000; ">Status</strong>'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblA003STATUS',
                                                            labelAlign: 'center',
                                                            width: 80,
                                                            padding: '10px 5px 0px 10px',
                                                            style: 'color:#1A5329;',
                                                            html: '<strong style="color:#1A5329;"></strong>'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblA003INICIO',
                                                            labelAlign: 'center',
                                                            width: 80,
                                                            padding: '10px 5px 0px 10px',
                                                            style: 'color:#1A5329;',
                                                            html: '<strong style="color:#1A5329;"></strong>',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip-width': 400,
                                                                'data-qtip': 'Status From'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            padding: '10px 5px 0px 10px',
                                                            style: 'color:#1A5329;',
                                                            html: '<strong style="color:#1A5329;">-</strong>'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            id: prototype.id + '-lblA003TERMIN',
                                                            width: 80,
                                                            style: 'color:#1A5329;',
                                                            padding: '10px 5px 0px 10px',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip-width': 400,
                                                                'data-qtip': 'Status To'
                                                            }


                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            width: 90,
                                                            padding: '1px 5px 5px 10px',
                                                            html: '<strong style="color:#000;">Rep. Date</strong>',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip-width': 400,
                                                                'data-qtip': 'Report Last Date'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            padding: '1px 5px 5px 10px',
                                                            id: prototype.id + '-txtA003REPORT',
                                                            fieldStyle: 'text-align:center',
                                                            format: 'Y/m/d',
                                                            editable: true,
                                                            maskRe: /[0-9/]/,
                                                            width: 90
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            width: 70,
                                                            padding: '1px 5px 5px 10px',
                                                            html: '<strong style="color:#000;">Period</strong>',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip-width': 400,
                                                                'data-qtip': 'Last (From) Period'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            id: prototype.id + '-txtA003PERIDE',
                                                            padding: '1px 5px 5px 10px',
                                                            fieldStyle: 'text-align:center',
                                                            format: 'Y/m/d',
                                                            editable: true,
                                                            maskRe: /[0-9/]/,
                                                            width: 90
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            width: 20,
                                                            padding: '1px 5px 5px 10px',
                                                            html: '<strong style="color:#000;">To</strong>',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip-width': 400,
                                                                'data-qtip': 'Last (To) Period'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            id: prototype.id + '-txtA003PERIA',
                                                            fieldStyle: 'text-align:center',
                                                            format: 'Y/m/d',
                                                            editable: true,
                                                            maskRe: /[0-9/]/,
                                                            padding: '1px 5px 5px 10px',
                                                            width: 90

                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            width: 90,
                                                            padding: '1px 5px 5px 10px',
                                                            html: '<strong style="color:#000;">Cnsig. Date</strong>',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip-width': 400,
                                                                'data-qtip': 'Last Consignment Date'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            id: prototype.id + '-txtA003FREMES',
                                                            padding: '1px 5px 5px 10px',
                                                            fieldStyle: 'text-align:center',
                                                            format: 'Y/m/d',
                                                            editable: true,
                                                            maskRe: /[0-9/]/,
                                                            width: 90
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            width: 90,
                                                            padding: '1px 5px 5px 10px',
                                                            html: '<strong style="color:#000;">Consignment</strong>',
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip-width': 400,
                                                                'data-qtip': 'Last Consignment'
                                                            }

                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtA003REMESA',
                                                            required: true,
                                                            disabled: false,
                                                            fieldLabel: '',
                                                            width: 180,
                                                            labelWidth: 0,
                                                            labelAlign: 'right',
                                                            fieldStyle: ' text-align:right ',
                                                            maxLength: 6,
                                                            enforceMaxLength: true,
                                                            padding: '1px 5px 5px 10px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E3EAF9',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'center',
                                                            width: 90,
                                                            padding: '1px 5px 0px 10px',
                                                            html: '<strong style="color:#000;">Comment</strong>'

                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtA003COMENT',
                                                            required: true,
                                                            disabled: false,
                                                            fieldLabel: '',
                                                            width: 380,
                                                            labelWidth: 0,
                                                            labelAlign: 'right',
                                                            fieldStyle: ' text-align:left ',
                                                            maxLength: 60,
                                                            enforceMaxLength: true,
                                                            padding: '1px 5px 5px 10px'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //continuar
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 200,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; text-decoration:underline">Sponsos Information</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; text-decoration:underline">Credit</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-txtA003CRMONE',
                                            labelAlign: 'center',
                                            width: 120,
                                            style: 'color:#1A5329;',
                                            padding: '10px 5px 0px 10px',
                                            html: '-'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 200,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; text-decoration:underline">National Commission</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 200,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; text-decoration:underline">International Commission</strong>'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 60,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003PROCOD',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 40,
                                            enforceMaxLength: true,
                                            padding: '1px 60px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 60,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Limits</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CRLIMI',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 40,
                                            maskRe: /[0-9.]/,
                                            enforceMaxLength: true,
                                            padding: '1px 60px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">ON Line</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CNACON',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 60,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 40,
                                            maskRe: /[0-9.]/,
                                            enforceMaxLength: true,
                                            padding: '1px 60px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">ON Line</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CINTON',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 60,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 40,
                                            maskRe: /[0-9.]/,
                                            enforceMaxLength: true,
                                            padding: '1px 60px 5px 10px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 60,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Sponsor</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003PROMOT',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 130,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 40,
                                            enforceMaxLength: true,
                                            padding: '1px 0px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 60,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Days</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CRDIAS',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 40,
                                            maskRe: /[0-9.]/,
                                            enforceMaxLength: true,
                                            padding: '1px 60px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">OFF Line</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CNACOF',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 60,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 40,
                                            maskRe: /[0-9.]/,
                                            enforceMaxLength: true,
                                            padding: '1px 60px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">OFF Line</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CINTOF',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 60,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 40,
                                            maskRe: /[0-9.]/,
                                            enforceMaxLength: true,
                                            padding: '1px 60px 5px 10px'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + 'panel2',
                            title: 'Additional Information',
                            layout: 'vbox',
                            bodyStyle: 'background: #E3EAF9',
                            width: 830,
                            height: 620,
                            anchor: '100%',
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 150,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; text-decoration:underline">Legal Representative</strong>'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            html: '<strong style="color:#000;">Name</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003REPRES',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 180,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 40,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 70,
                                            html: '<strong style="color:#000;">Phone</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003REPTLF',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 15,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003REPCAR',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Position</strong>',
                                            width: 280,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 20,
                                            enforceMaxLength: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            html: '<strong style="color:#000;">Address</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003REPDIR',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 400,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 40,
                                            enforceMaxLength: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 300,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; text-decoration:underline">Additional Information</strong>'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            html: '<strong style="color:#000;">Indicador</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003INDI1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 180,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 1,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 90,
                                            html: '<strong style="color:#000;">Main Office</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003OFPRC',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 90,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 8,
                                            enforceMaxLength: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 250,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; text-decoration:underline">Guarantee Information Contact #1</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            id: prototype.id + '-lblA003FIINI1',
                                            width: 80,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; "></strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 20,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; ">-</strong>'
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblA003FITER1',
                                            labelAlign: 'center',
                                            width: 100,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; "></strong>'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Type</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANT1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 30,
                                            enforceMaxLength: true,
                                            padding: '10px 10px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Document</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIAND1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            padding: '10px 15px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 70,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Currency</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANM1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 60,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            padding: '10px 15px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 60,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Amount</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANI1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 50,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 15,
                                            enforceMaxLength: true,
                                            padding: '10px 15px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Bank</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANB1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 50,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            padding: '10px 10px 5px 10px'
                                        }
                                    ]
                                },
                                //
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 250,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; text-decoration:underline">Guarantee Information Contact #2</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            id: prototype.id + '-lblA003FIINI2',
                                            width: 80,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; "></strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 20,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; ">-</strong>'
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id + 'lblA003FITER3',
                                            labelAlign: 'center',
                                            width: 100,
                                            padding: '10px 5px 0px 5px',
                                            html: '<strong style="color:#000; "></strong>'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Type</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANT2',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            padding: '10px 10px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Document</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIAND2',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 70,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            padding: '10px 15px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 70,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Currency</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANM2',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 60,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            padding: '10px 15px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 60,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Amount</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANI2',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 50,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:right ',
                                            maxLength: 15,
                                            enforceMaxLength: true,
                                            padding: '10px 15px 5px 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '10px 5px 0px 10px',
                                            html: '<strong style="color:#000; ">Bank</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FIANB2',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 50,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 20,
                                            enforceMaxLength: true,
                                            padding: '10px 10px 5px 10px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            html: '<strong style="color:#000; text-decoration:underline">Over Data</strong>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            html: '<strong style="color:#000;">Main Off. City</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003OVERPP',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 150,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 10,
                                            padding: '10px 40px 0px 10px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 100,
                                            html: '<strong style="color:#000;">Classification</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003OVERCL',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 100,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 10,
                                            enforceMaxLength: true
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            html: '<strong style="color:#000;">Nat. Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003OVERNA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 100,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 5,
                                            padding: '10px 90px 0px 10px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 100,
                                            html: '<strong style="color:#000;">Nat. End Date</strong>'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtA003OVERFN',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            editable: true,
                                            maskRe: /[0-9/]/,
                                            width: 110
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 120,
                                            html: '<strong style="color:#000;">Int. Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003OVERIN',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 100,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 5,
                                            padding: '10px 90px 0px 10px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 100,
                                            html: '<strong style="color:#000;">Int. End Date</strong>'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtA003OVERFI',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            editable: true,
                                            maskRe: /[0-9/]/,
                                            width: 110
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 300,
                                            html: '<strong style="color:#000; text-decoration:underline">Audit Information</strong>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            html: '<strong style="color:#000;">Operator</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003OPERA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 10,
                                            padding: '10px 90px 0px 10px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            html: '<strong style="color:#000;">Account(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCIA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 30,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 2,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUNIDA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 30,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 2,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCECOS',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 50,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 6,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtUBICA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 40,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 4,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCTA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 40,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 4,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtSCTA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 50,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 5,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtEQUI',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 40,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 4,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtICIA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 30,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 2,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    defaults: {
                                        padding: '10px 5px 0px 10px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            html: '<strong style="color:#000;">System Date</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003FSIST',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 8,
                                            padding: '10px 90px 0px 10px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            html: '<strong style="color:#000;">Area</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003AREA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 30,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 1,
                                            padding: '10px 30px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            html: '<strong style="color:#000;">Customer Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CCLIEN',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 10,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            html: '<strong style="color:#000;">Supplier Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA003CPROVE',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 80,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:left ',
                                            maxLength: 10,
                                            padding: '10px 5px 0px 5px',
                                            enforceMaxLength: true
                                        },
                                    ]
                                }
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
            margin: '5 100 10 50',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    //hidden: true,
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
});