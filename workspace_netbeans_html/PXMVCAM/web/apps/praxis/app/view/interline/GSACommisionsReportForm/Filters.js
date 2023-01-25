/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.interline.GSACommisionsReportForm.Filters', {
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
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
                width: 1100
            },
            items: [
                /**
                 *  Panel 01
                 * */
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelFilterMain',
                    bodyStyle: 'background-color: transparent;',
                    padding: '1',
                    margin: '1',
                    border: false,
                    layout: {
                        type: 'vbox'
                                //align: 'center'
                    },
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '0px 1px 0px 0px',
                        anchor: '100%',
                        width: 1100
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters1',
                            border: false,
                            style: 'border-bottom: 2px #ffffff solid;',
                            layout: 'hbox',
                            defaults: {
                                //labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '2px 3px 2px 3px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    style: 'font-weight:bold;',
                                    padding: '10 5 5 5',
                                    width: 50

                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFecha',
                                    fieldStyle: 'text-align: center;',
                                    editable: false,
                                    fieldLabel: '',
                                    width: 110,
                                    labelWidth: 0,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear',
                                    fieldStyle: 'text-align: center;',
                                    disabled: false,
                                    fieldLabel: 'From',
                                    width: 110,
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    maxLength: 4,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth',
                                    fieldStyle: 'text-align: center;',
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 60,
                                    labelWidth: 0,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    maxLength: 3,
                                    enforceMaxLength: true
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear',
                                    fieldStyle: 'text-align: center;',
                                    disabled: false,
                                    fieldLabel: 'To',
                                    width: 100,
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    maxLength: 4,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth',
                                    fieldStyle: 'text-align: center;',
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 60,
                                    labelWidth: 0,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    maxLength: 3,
                                    enforceMaxLength: true
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCurrency',
                                    fieldStyle: 'text-align: center;',
                                    disabled: false,
                                    fieldLabel: 'Currency',
                                    width: 130,
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbArea',
                                    fieldStyle: 'text-align: center;',
                                    disabled: false,
                                    fieldLabel: 'Area',
                                    width: 130,
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters2',
                            style: 'border-bottom: 2px #ffffff solid;',
                            border: false,
                            layout: 'column',
                            defaults: {
                                // labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '2px 3px 2px 3px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Region',
                                    style: 'font-weight:normal;',
                                    padding: '10 5 5 5',
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbRegion',
                                    fieldStyle: 'text-align: center;',
                                    // editable: false,
                                    fieldLabel: '',
                                    width: 110,
                                    labelWidth: 0,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAgente',
                                    fieldStyle: 'text-align: center;',
                                    // editable: false,
                                    fieldLabel: 'Agent',
                                    width: 175,
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbZona',
                                    fieldStyle: 'text-align: center;',
                                    //editable: false,
                                    fieldLabel: 'Zone',
                                    width: 175,
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAerolinea',
                                    fieldStyle: 'text-align: left;',
                                    disabled: false,
                                    fieldLabel: 'Airline',
                                    width: 260,
                                    labelWidth: 50,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'A005KEY',
                                    displayField: 'A005KEY2'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPMI',
                                    hidden: true,
                                    fieldStyle: 'text-align: left;', disabled: false,
                                    fieldLabel: 'PMI',
                                    width: 100,
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters3',
                            //style: 'border-bottom: 2px #ffffff solid;',
                            border: false,
                            layout: 'column',
                            defaults: {
                                // labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '2px 3px 2px 3px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:normal;',
                                    padding: '10 5 5 5',
                                    width: 50,
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCountry',
                                    fieldStyle: 'text-align: center;',
                                    //editable: false,
                                    fieldLabel: '',
                                    width: 200,
                                    labelWidth: 0,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCity',
                                    fieldStyle: 'text-align: center;',
                                    //editable: false,
                                    fieldLabel: 'City',
                                    width: 265,
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'A1007CTATO',
                                    displayField: 'A1007NOMBR'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTKT',
                                    //                            hidden:true,
                                    required: true,
                                    readOnly: false,
                                    fieldLabel: 'Ticket',
                                    width: 140,
                                    labelWidth: 50,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left',
                                    maxLength: 13,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/
                                }


                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: white',
                    id: prototype.id + '-panelSearch',
                    border: true,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '4px 7px 4px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radiogroup1',
                            fieldLabel: '',
                            horizontal: false,
                            items: [
                                {boxLabel: '<strong style="color:#046aaa" >Date   </strong>', name: 'rb', inputValue: 'btn1', width: 100, checked: true},
                                {boxLabel: '<strong style="color:#046aaa" >Airline </strong>', name: 'rb', inputValue: 'btn2', width: 100},
                                {boxLabel: '<strong style="color:#046aaa" >Country </strong>', name: 'rb', inputValue: 'btn3', width: 100},
                                {boxLabel: '<strong style="color:#046aaa" >Agent </strong>', name: 'rb', inputValue: 'btn4', width: 100}

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: white',
                    id: prototype.id + '-panelSearchPOLIZ',
                    border: true,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '4px 7px 4px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radiogroup2',
                            fieldLabel: '',
                            horizontal: false,
                            items: [
                                {boxLabel: '<strong style="color:#046aaa" >Poliza   </strong>', name: 'rb2', inputValue: 'btn1', width: 100, checked: true},
                                {boxLabel: '<strong style="color:#046aaa" >Clearing </strong>', name: 'rb2', inputValue: 'btn2', width: 100}

                            ]
                        }
                    ]
                }
            ]
        }
    ]
});



