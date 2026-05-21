Ext.define('Ext.Praxis.view.refund.ControlBsplinkProcessForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E1E6EC;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '12px 0 12px 12px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                labelAlign: 'left'
            },
            items: [
                 {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Authorization Date </strong>',
                    id: prototype.id + '-lblDate',
                    style: 'margin-top: 4px',
                    align: 'center',
                    hidden: true,
                    width: 130,
                    fieldStyle: 'text-align: center;'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 35,
                    width: 100,
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
                    width: 50,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromDay',
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
                    width: 50,
                    margin:'0 10 0 0',
                    anchor: '100%'
                },
                {
                        xtype: 'combo',
                        id: prototype.id + '-cmbDateToYear',
                        fieldLabel: 'To',
                        labelAlign: 'left',
                        queryMode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        autoSelect: false,
                        enableKeyEvents: true,
                        caseSensitive: true,
                        valueField: 'code',
                        displayField: 'name',
                        emptyText: 'All',
                        labelWidth: 20,
                        width: 80,
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
                        width: 50,
                        anchor: '100%'
                    },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
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
                    width: 50,
                    anchor: '100%',
                    margin:'0 10 0 0'
                },

            ]
        }
    ]
});



