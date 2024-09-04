Ext.define('Ext.Praxis.controller.payments.InputsSecondPhase.CalendarDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarDataEntryController',
    url: CONTEXTPATH + '/InputsPhase2',
    afterRender: function () {
        this.getData();
    },
    getData: async function () {
        let me = this.view;
        me.mask('Loading Data...');
        const res = await fetch(`${this.url}/searchCalendarDateInfo?${new URLSearchParams(me.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            if (data.length === 0) {
                global.Msg({msg: 'Data not found'});
                me.close();
                return;
            }
            let calendarInfo = Ext.create('Ext.data.Store', {
                storeId: prototype.id + '-calendar-de-data',
                proxy: {
                    type: 'memory'
                },
                autoLoad: true,
                autoSync: true,
                data: data.response
            });
            Ext.getCmp(prototype.idDE2 + '-gridCalendar').bindStore(calendarInfo);
        }
        me.unmask();
    },
    onCancelClick: function () {
        this.view.close();
    }
});
