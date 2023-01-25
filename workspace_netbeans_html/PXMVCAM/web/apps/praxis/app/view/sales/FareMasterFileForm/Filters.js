/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FareMasterFileForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '1px 5px 1px 5px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 5px',
                anchor: '100%'
            },
            items: [
                /**
                 *  PANEL SEARCH BY
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Search By',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        }
                        , {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSearchType',
                            fieldLabel: '',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 0,
                            width: 130
                        }
                    ]
                },
                /**
                 *  PANEL SUSCRIPTION
                 * 
                 * */

                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelSuscription',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 5px',
                        enableKeyEvents: true,
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIdSubscription',
                            required: true,
                            readOnly: false,
                            enableKeyEvents: true,
                            fieldLabel: '<strong style="color:#000;">Id Subscription </strong>',
                            width: 250,
                            labelWidth: 110,
                            enforceMaxLength: true,
                            maxLength: 15,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxProductCode',
                            margin: '0 0 0 10',
                            fieldLabel: 'Product Code',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 95,
                            width: 320
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTransmissionType',
                            margin: '0 0 0 10',
                            fieldLabel: 'Transmission Type',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 130,
                            width: 230
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxDateOfFileYear',
                            fieldLabel: 'Date of File',
                            labelAlign: 'center',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 100,
                            width: 190,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxDateOfFileMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxDateOfFileDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        }
                    ]
                },
                /*
                 *  PANEL CARRIER 
                 * 
                 **/

                {
                    xtype: 'panel',
                    border: false,
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelCarrier',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '1px 1px 1px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxCarrierCode',
                                    fieldLabel: 'Carrier',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 60,
                                    width: 130
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxCarrierName',
                                    fieldLabel: '',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    anyMatch: false,
                                    labelWidth: 0,
                                    width: 150
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFareClass',
                                    required: true,
                                    readOnly: false,
                                    fieldLabel: '<strong style="color:#000;">Fare Class </strong>',
                                    width: 190,
                                    labelWidth: 90,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    maxLength: 8,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'right'

                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxOriCityCode',
                                    fieldLabel: 'Ori City',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 60,
                                    width: 130,
                                    listConfig: {width: 500}
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxOriCityName',
                                    fieldLabel: '',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 0,
                                    width: 150
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxDestCityCode',
                                    fieldLabel: 'Dest City',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 70,
                                    width: 140
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxDestCityName',
                                    fieldLabel: '',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 0,
                                    width: 150
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '5px 1px 5px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxDirectionalInd',
                                    fieldLabel: 'Directional Ind',
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
                                    width: 250
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxTariffEffDateYear',
                                    fieldLabel: 'Tariff  Eff.  Date',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 120,
                                    width: 210,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxTariffEffDateMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 70,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxTariffEffDateDay',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 70,
                                    anchor: '100%'
                                }
                            ]
                        }

                    ]
                },
                /**
                 * 
                 *  PANEL FAREBASIS
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFarebasis',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '1px 1px 1px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxCarrierCode0',
                            fieldLabel: 'Carrier',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 60,
                            width: 130
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxCarrierName0',
                            fieldLabel: '',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 0,
                            width: 150
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxOriCityCode0',
                            fieldLabel: 'Ori City',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR',
                            labelWidth: 60,
                            width: 130
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxOriCityName0',
                            fieldLabel: '',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR',
                            labelWidth: 0,
                            width: 150
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxDestCityCode0',
                            fieldLabel: 'Dest City',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR',
                            labelWidth: 70,
                            width: 140
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxDestCityName0',
                            fieldLabel: '',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR',
                            labelWidth: 0,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFareClass0',
                            required: true,
                            readOnly: false,
                            fieldLabel: '<strong style="color:#000;">Fare Class </strong>',
                            width: 190,
                            labelWidth: 90,
                            enforceMaxLength: true,
                            maxLength: 8,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'

                        }
                    ]
                },
                /*
                 *  PANEL DIRECTIONAL IND
                 * 
                 **/

                {
                    xtype: 'panel',
                    border: false,
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelDirectionalInd',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '5px 1px 1px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxCarrierCode1',
                                    fieldLabel: 'Carrier',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 60,
                                    width: 130
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxCarrierName1',
                                    fieldLabel: '',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 0,
                                    width: 150
                                }, {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxDirectionalInd0',
                                    fieldLabel: 'Directional Ind',
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
                                    width: 250
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxOriCityCode1',
                                    fieldLabel: 'Ori City',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 60,
                                    width: 130
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxOriCityName1',
                                    fieldLabel: '',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 0,
                                    width: 150
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxDestCityCode1',
                                    fieldLabel: 'Dest City',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 70,
                                    width: 140
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxDestCityName1',
                                    fieldLabel: '',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: true,
                                    triggerAction: 'all',
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR',
                                    labelWidth: 0,
                                    width: 150
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '5px 1px 5px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFareClass1',
                                    required: true,
                                    readOnly: false,
                                    fieldLabel: '<strong style="color:#000;">Fare Class </strong>',
                                    width: 190,
                                    labelWidth: 90,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'

                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxTariffEffDateYear0',
                                    fieldLabel: 'Tariff Eff. Date',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 120,
                                    width: 210,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxTariffEffDateMonth0',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 70,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxTariffEffDateDay0',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 70,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxLastDateYear',
                                    fieldLabel: 'Last Date',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 100,
                                    width: 190,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxLastDateMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 70,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxLastDateDay',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 70,
                                    anchor: '100%'
                                }
                            ]
                        }

                    ]
                }
            ]
        }
    ]
});

