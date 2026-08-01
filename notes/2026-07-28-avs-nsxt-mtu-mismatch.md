A customer reported that some applications across two AVS network segments were
failing intermittently, while basic connectivity looked perfectly healthy. This
is the write-up of how we found it and fixed it.

## Symptoms

- `ping` between the two VMs worked every time.
- Small HTTP requests succeeded; large payloads and file transfers **hung or
  reset**.
- No firewall denies in the NSX-T distributed firewall logs.

The "small works, large fails" pattern is the tell-tale sign of an **MTU
mismatch** somewhere on the path.

## Root cause

The NSX-T **overlay (Geneve)** adds encapsulation overhead on top of each frame.
The transport nodes were configured for an MTU of `1600`, but one uplink on the
underlay had been left at the default `1500`. Large packets that needed
fragmentation were silently dropped because the *Don't Fragment* bit was set.

```
Guest MTU        1500
+ Geneve overhead  ~50
= required underlay MTU >= 1600
```

With the underlay stuck at `1500`, anything near full size fell off the path.

## The fix

1. Set the **underlay** (physical uplink + transport zone) MTU to at least
   `1600` end to end — not just on the AVS side.
2. Confirm the NSX-T **Global fabric MTU** matches under *System → Fabric →
   Settings*.
3. Validate with a **DF-bit ping** sized to the overlay:

```
vmkping -d -s 1572 -I vmk10 <remote-tep-ip>
```

If that succeeds and a `1573`-byte ping fails, your overlay MTU headroom is
exactly right.

## Lessons learned

- **Ping is not a connectivity test** — it only proves small packets flow.
- MTU has to be consistent on **every hop**, including the physical underlay you
  don't always control.
- Always test with the *Don't Fragment* bit set; a normal ping will happily
  fragment and hide the problem.
