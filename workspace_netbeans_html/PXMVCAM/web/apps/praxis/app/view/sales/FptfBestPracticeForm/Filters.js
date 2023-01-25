/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FptfBestPracticeForm.Filters', {
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
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '20px 1px 5px 5px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
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
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
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
                }, {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
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
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
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
                    xtype: 'panel',
                    bodyStyle: 'background: transparent ; border-color:white',
                    border: true,
                    layout: 'hbox',
                    padding: '5px 1px 5px 5px',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '0px 1px 0px 1px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgSearch',
                            fieldLabel: '',
                            columns: 1,
                            vertical: true,
                            width: 80,
                            items: [
                                {boxLabel: '<strong style="color:#209234;">Form </strong>', name: 'rb', inputValue: 'FORMA', checked: true},
                                {boxLabel: '<strong style="color:#209234;">Source </strong>', name: 'rb', inputValue: 'FUENTE'}

                            ]
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtForm',
                            padding: '15 1px 5px 5px',
                            required: true,
                            readOnly: false,
                            fieldLabel: '',
                            width: 50,
                            enableKeyEvents: true,
                            labelWidth: 0,
                            enforceMaxLength: true,
                            maxLength: 3,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSource',
                            padding: '15px 1px 5px 5px',
                            required: true,
                            readOnly: false,
                            fieldLabel: '',
                            width: 50,
                            enableKeyEvents: true,
                            labelWidth: 0,
                            enforceMaxLength: true,
                            maxLength: 3,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'

                        }
                    ]
                }

            ]
        }
    ]
});

