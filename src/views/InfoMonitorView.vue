<script setup lang="ts">
import { useMonitorData } from '@/composables/useMonitorData'
import MonitorShell from '@/components/MonitorShell.vue'
import InfoView from '@/views/monitor-modes/InfoView.vue'

const { monitor, loading, connectionOk, connectedSince, disconnectedSince, units, tenant } = useMonitorData()
</script>

<template>
  <MonitorShell
    :monitor="monitor"
    :loading="loading"
    :connection-ok="connectionOk"
    :connected-since="connectedSince"
    :disconnected-since="disconnectedSince"
  >
    <InfoView
      v-if="monitor"
      :department-name="monitor.departmentName"
      :connection-ok="connectionOk"
      :units="units"
      :tenant="tenant"
    />
  </MonitorShell>
</template>
