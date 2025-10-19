'use client'

import { useEffect } from 'react'
import './gantt.css'

export default function GanttChart() {
  useEffect(() => {
    // All the JavaScript logic from the original HTML file
    const script = () => {
      // Updated timeline with phase headers as separate items
      const initialTasks = [
        { type: "phase", name: "PHASE 0: DISCOVERY", startWeek: 0, durationWeeks: 9, class: "discovery" },
        { type: "task", name: "User Research & Workshops", startWeek: 0, durationWeeks: 3, class: "discovery", label: "Research" },
        { type: "task", name: "Slack Prototype Testing", startWeek: 0, durationWeeks: 3, class: "discovery", label: "Prototype" },

        { type: "phase", name: "FOUNDATION", startWeek: 0, durationWeeks: 4, class: "foundation" },
        { type: "task", name: "Core Backend Architecture", startWeek: 0, durationWeeks: 1, class: "foundation", label: "Backend Setup" },
        { type: "task", name: "Data Pipeline Setup", startWeek: 0, durationWeeks: 1, class: "foundation", label: "Data Pipelines" },

        { type: "phase", name: "QUICK WINS", startWeek: 0, durationWeeks: 3, class: "quick-win" },
        { type: "task", name: "Portfolio Price Alerts", startWeek: 0, durationWeeks: 3, class: "quick-win", label: "Price Alerts" },
        { type: "task", name: "Daily Reports", startWeek: 0, durationWeeks: 3, class: "quick-win", label: "Daily Reports" },
        { type: "task", name: "Basic Position Analysis", startWeek: 0, durationWeeks: 3, class: "quick-win", label: "Position Analysis" },
        { type: "task", name: "Token Unlock Calendar", startWeek: 3, durationWeeks: 4, class: "quick-win", label: "Unlock Calendar" },

        { type: "phase", name: "Alpha TESTING", startWeek: 3, durationWeeks: 6, class: "testing" },
        { type: "task", name: "Alpha Testing (2-3 users)", startWeek: 3, durationWeeks: 3, class: "testing", label: "Alpha Testing" },
        { type: "task", name: "Iterate on Feedback", startWeek: 3, durationWeeks: 6, class: "testing", label: "Iterate on Feedback" },

        { type: "phase", name: "BETA TESTING", startWeek: 9, durationWeeks: 6, class: "testing" },
        { type: "task", name: "Beta Rollout", startWeek: 9, durationWeeks: 3, class: "testing", label: "Beta Testing" },
        { type: "task", name: "Iterate on Feedback", startWeek: 9, durationWeeks: 6, class: "testing", label: "Iterate on Feedback" },

        { type: "phase", name: "MEDIUM TERM", startWeek: 15, durationWeeks: 6, class: "medium" },
        { type: "task", name: "Cross Position Correlation", startWeek: 15, durationWeeks: 2, class: "medium", label: "Correlation Engine" },
        { type: "task", name: "Competitor Fund Analysis", startWeek: 15, durationWeeks: 2, class: "medium", label: "On-chain Analysis" },
        { type: "task", name: "Position Sizing Recommendations", startWeek: 18, durationWeeks: 3, class: "medium", label: "Sizing Models" },
        { type: "task", name: "Error Learning System", startWeek: 18, durationWeeks: 3, class: "medium", label: "Safeguards" },

        { type: "phase", name: "PRODUCTION", startWeek: 22, durationWeeks: 5, class: "testing" },
        { type: "task", name: "Production Rollout", startWeek: 22, durationWeeks: 4, class: "testing", label: "Production Rollout" },
        { type: "task", name: "Solve issues & warranty", startWeek: 22, durationWeeks: 4, class: "testing", label: "New Solve issues & warrantyTask" },

        { type: "phase", name: "LONG TERM", startWeek: 27, durationWeeks: 10, class: "long-term" },
        { type: "task", name: "Custom LLM Training", startWeek: 27, durationWeeks: 8, class: "long-term", label: "Custom LLM Development" },
        { type: "task", name: "Multi-Agent System", startWeek: 33, durationWeeks: 8, class: "long-term", label: "Multi-Agent Architecture" },
        { type: "task", name: "Predictive Alpha Engine", startWeek: 39, durationWeeks: 8, class: "long-term", label: "Alpha Generation" },

        { type: "phase", name: "OPTIMIZATION", startWeek: 27, durationWeeks: 26, class: "optimization" },
        { type: "task", name: "Continuous Learning", startWeek: 27, durationWeeks: 26, class: "optimization", label: "Ongoing Optimization" }
      ];

      // Load tasks from localStorage or use initial tasks
      let tasks = loadFromStorage() || JSON.parse(JSON.stringify(initialTasks));
      let draggedElement: any = null;
      let draggedTaskIndex: number | null = null;
      let draggedRowIndex: number | null = null;
      let dropPosition: string | null = null;
      let isResizing = false;
      let resizeData: any = null;

      // Available color schemes - define this early before any usage
      const colorSchemes = [
        { name: 'discovery', display: 'Discovery Blue', gradient: 'linear-gradient(90deg, #192FAB, #2B4BC8)' },
        { name: 'foundation', display: 'Foundation Sky', gradient: 'linear-gradient(90deg, #3B5FD3, #5479E0)' },
        { name: 'quick-win', display: 'Quick Win Green', gradient: 'linear-gradient(90deg, #4CAF50, #66BB6A)' },
        { name: 'medium', display: 'Medium Orange', gradient: 'linear-gradient(90deg, #FF9800, #FFB74D)' },
        { name: 'long-term', display: 'Long Term Pink', gradient: 'linear-gradient(90deg, #E91E63, #F06292)' },
        { name: 'testing', display: 'Testing Purple', gradient: 'linear-gradient(90deg, #9C27B0, #BA68C8)' },
        { name: 'optimization', display: 'Optimization Gray', gradient: 'linear-gradient(90deg, #607D8B, #78909C)' }
      ];

      // SVG Icons
      const trashIconSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
              stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

      const dragHandleIcon = '⋮⋮';

      // Local storage functions
      function saveToStorage() {
        try {
          localStorage.setItem('shift20_gantt_tasks', JSON.stringify(tasks));
        } catch (e) {
          console.error('Failed to save to localStorage:', e);
        }
      }

      function loadFromStorage() {
        try {
          const stored = localStorage.getItem('shift20_gantt_tasks');
          return stored ? JSON.parse(stored) : null;
        } catch (e) {
          console.error('Failed to load from localStorage:', e);
          return null;
        }
      }

      function clearStorage() {
        try {
          localStorage.removeItem('shift20_gantt_tasks');
        } catch (e) {
          console.error('Failed to clear localStorage:', e);
        }
      }

      // Auto-save after any changes
      function autoSave() {
        saveToStorage();
      }

      // Month names and quarters
      const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      const quarters = ['Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027'];
      const weeksPerMonth = [4, 4, 5, 4, 4, 4, 5, 4, 4, 5, 4, 4, 4, 5, 4, 4, 4, 4];

      function generateHeaders() {
        const thead = document.getElementById('ganttHeader');
        thead.innerHTML = '';

        // Quarter row
        const quarterRow = document.createElement('tr');
        const taskHeaderQ = document.createElement('th');
        taskHeaderQ.className = 'task-header';
        taskHeaderQ.rowSpan = 3;
        taskHeaderQ.textContent = 'Task / Initiative';
        quarterRow.appendChild(taskHeaderQ);

        let weekCount = 0;
        for (let q = 0; q < 6; q++) {
          const quarterHeader = document.createElement('th');
          quarterHeader.className = 'quarter-header';
          quarterHeader.colSpan = 13;
          quarterHeader.textContent = quarters[q];
          quarterRow.appendChild(quarterHeader);
          weekCount += 13;
        }
        thead.appendChild(quarterRow);

        // Month row
        const monthRow = document.createElement('tr');
        for (let m = 0; m < 18; m++) {
          const monthHeader = document.createElement('th');
          monthHeader.className = 'month-header';
          monthHeader.colSpan = weeksPerMonth[m];
          monthHeader.textContent = months[m];
          monthRow.appendChild(monthHeader);
        }
        thead.appendChild(monthRow);

        // Week row
        const weekRow = document.createElement('tr');
        for (let w = 0; w < 78; w++) {
          const weekHeader = document.createElement('th');
          weekHeader.className = 'week-header';
          weekHeader.textContent = '';
          weekRow.appendChild(weekHeader);
        }
        thead.appendChild(weekRow);
      }

      function renderGantt() {
        const tbody = document.getElementById('ganttBody');
        tbody.innerHTML = '';

        tasks.forEach((task, index) => {
          const row = document.createElement('tr');
          row.dataset.rowIndex = index;

          if (task.type === 'phase') {
            row.className = 'phase-row';
          }

          // Task name cell with drag handle
          const nameCell = document.createElement('td');
          nameCell.className = 'task-cell';

          const dragHandle = document.createElement('div');
          dragHandle.className = 'drag-handle';
          dragHandle.innerHTML = dragHandleIcon;
          dragHandle.draggable = true;
          dragHandle.ondragstart = (e) => startRowDrag(e, index);
          dragHandle.ondragend = endRowDrag;
          nameCell.appendChild(dragHandle);

          const taskContent = document.createElement('div');
          taskContent.className = 'task-content';

          const nameInput = document.createElement('input');
          nameInput.type = 'text';
          nameInput.className = 'task-name';
          nameInput.value = task.name;
          nameInput.onchange = (e) => updateTaskName(index, e.target.value);
          taskContent.appendChild(nameInput);

          nameCell.appendChild(taskContent);

          const taskControls = document.createElement('div');
          taskControls.className = 'task-controls';

          // Color picker
          const colorPicker = document.createElement('div');
          colorPicker.className = 'color-picker';
          colorPicker.style.background = colorSchemes.find(c => c.name === task.class)?.gradient || colorSchemes[0].gradient;
          colorPicker.onclick = (e) => toggleColorPicker(e, index);

          const colorDropdown = document.createElement('div');
          colorDropdown.className = 'color-dropdown';
          colorDropdown.id = `color-dropdown-${index}`;

          colorSchemes.forEach(scheme => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            if (scheme.name === task.class) {
              colorOption.classList.add('selected');
            }
            colorOption.style.background = scheme.gradient;
            colorOption.title = scheme.display;
            colorOption.onclick = (e) => {
              e.stopPropagation();
              changeTaskColor(index, scheme.name);
              closeAllColorPickers();
            };
            colorDropdown.appendChild(colorOption);
          });

          colorPicker.appendChild(colorDropdown);
          taskControls.appendChild(colorPicker);

          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
          deleteBtn.innerHTML = trashIconSVG;
          deleteBtn.title = 'Delete row';
          deleteBtn.onclick = () => deleteRow(index);
          taskControls.appendChild(deleteBtn);

          nameCell.appendChild(taskControls);

          row.appendChild(nameCell);

          // Week cells
          for (let week = 0; week < 78; week++) {
            const cell = document.createElement('td');
            cell.className = 'week-cell';
            cell.dataset.week = week;

            // Add bar if it starts in this week
            if (week === task.startWeek) {
              const bar = document.createElement('div');
              bar.className = task.type === 'phase' ? `bar phase-bar` : `bar ${task.class}`;
              bar.style.width = `${task.durationWeeks * 25}px`;
              bar.dataset.taskIndex = index;

              // Add resize handles for all bars (including phases now)
              const leftHandle = document.createElement('div');
              leftHandle.className = 'resize-handle left';
              leftHandle.onmousedown = (e) => startResize(e, index, 'left');
              bar.appendChild(leftHandle);

              const rightHandle = document.createElement('div');
              rightHandle.className = 'resize-handle right';
              rightHandle.onmousedown = (e) => startResize(e, index, 'right');
              bar.appendChild(rightHandle);

              // Make all bars draggable including phase bars
              bar.draggable = true;
              bar.ondragstart = (e) => startBarDrag(e, index);
              bar.ondragend = endBarDrag;

              const barText = document.createElement('input');
              barText.type = 'text';
              barText.className = 'bar-text';
              barText.value = task.label || task.name;
              barText.onclick = (e) => e.stopPropagation();
              barText.onchange = (e) => updateTaskLabel(index, e.target.value);

              bar.appendChild(barText);
              cell.appendChild(bar);
            }

            // Add drop zone for all bars including phases
            cell.ondragover = handleBarDragOver;
            cell.ondrop = (e) => handleBarDrop(e, week);

            row.appendChild(cell);
          }

          // Add row drag events
          row.ondragover = (e) => handleRowDragOver(e, index);
          row.ondragleave = handleRowDragLeave;
          row.ondrop = (e) => handleRowDrop(e, index);

          tbody.appendChild(row);
        });
      }

      function startResize(e, index, direction) {
        e.stopPropagation();
        e.preventDefault();
        isResizing = true;

        const bar = e.target.parentElement;
        bar.classList.add('resizing');

        resizeData = {
          index: index,
          direction: direction,
          startX: e.clientX,
          startWeek: tasks[index].startWeek,
          startDuration: tasks[index].durationWeeks
        };

        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', endResize);
      }

      function handleResize(e) {
        if (!isResizing || !resizeData) return;

        const deltaX = e.clientX - resizeData.startX;
        const weeksDelta = Math.round(deltaX / 25);

        if (resizeData.direction === 'right') {
          const newDuration = Math.max(1, resizeData.startDuration + weeksDelta);
          tasks[resizeData.index].durationWeeks = newDuration;
        } else {
          const newStart = Math.max(0, resizeData.startWeek + weeksDelta);
          const durationAdjust = resizeData.startWeek - newStart;
          tasks[resizeData.index].startWeek = newStart;
          tasks[resizeData.index].durationWeeks = resizeData.startDuration + durationAdjust;
        }

        renderGantt();
      }

      function endResize(e) {
        isResizing = false;
        if (resizeData) {
          autoSave(); // Save after resize is complete
        }
        resizeData = null;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', endResize);

        const resizingBars = document.querySelectorAll('.bar.resizing');
        resizingBars.forEach(bar => bar.classList.remove('resizing'));
      }

      function startRowDrag(e, index) {
        draggedRowIndex = index;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', '');
        e.target.closest('tr').classList.add('dragging-row');
      }

      function endRowDrag(e) {
        e.target.closest('tr').classList.remove('dragging-row');
        document.querySelectorAll('.drop-indicator').forEach(el => el.remove());
        draggedRowIndex = null;
      }

      function handleRowDragOver(e, index) {
        if (draggedRowIndex === null || draggedRowIndex === index) return;
        e.preventDefault();

        const row = e.currentTarget;
        const rect = row.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        document.querySelectorAll('.drop-indicator').forEach(el => el.remove());

        const indicator = document.createElement('div');
        indicator.className = 'drop-indicator';

        if (e.clientY < midpoint) {
          indicator.classList.add('top');
          dropPosition = 'before';
        } else {
          indicator.classList.add('bottom');
          dropPosition = 'after';
        }

        row.appendChild(indicator);
      }

      function handleRowDragLeave(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          document.querySelectorAll('.drop-indicator').forEach(el => el.remove());
        }
      }

      function handleRowDrop(e, targetIndex) {
        e.preventDefault();
        if (draggedRowIndex === null) return;

        const draggedTask = tasks[draggedRowIndex];
        tasks.splice(draggedRowIndex, 1);

        let newIndex = targetIndex;
        if (draggedRowIndex < targetIndex && dropPosition === 'after') {
          newIndex = targetIndex;
        } else if (draggedRowIndex < targetIndex && dropPosition === 'before') {
          newIndex = targetIndex - 1;
        } else if (draggedRowIndex > targetIndex && dropPosition === 'after') {
          newIndex = targetIndex + 1;
        } else {
          newIndex = targetIndex;
        }

        tasks.splice(newIndex, 0, draggedTask);
        renderGantt();
        autoSave();
      }

      function startBarDrag(e, index) {
        if (isResizing) return;
        draggedTaskIndex = index;
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.classList.add('dragging');
      }

      function endBarDrag(e) {
        e.currentTarget.classList.remove('dragging');
        draggedTaskIndex = null;
      }

      function handleBarDragOver(e) {
        if (draggedTaskIndex === null) return;
        e.preventDefault();
        e.currentTarget.classList.add('drop-target');
      }

      function handleBarDrop(e, week) {
        e.preventDefault();
        e.currentTarget.classList.remove('drop-target');

        if (draggedTaskIndex !== null) {
          tasks[draggedTaskIndex].startWeek = week;
          renderGantt();
          autoSave();
        }
      }

      function toggleColorPicker(e, index) {
        e.stopPropagation();
        const dropdown = document.getElementById(`color-dropdown-${index}`);

        // Close all other dropdowns
        document.querySelectorAll('.color-dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });

        // Toggle this dropdown
        dropdown.classList.toggle('active');
      }

      function closeAllColorPickers() {
        document.querySelectorAll('.color-dropdown').forEach(d => {
          d.classList.remove('active');
        });
      }

      function changeTaskColor(index, colorClass) {
        tasks[index].class = colorClass;
        renderGantt();
        autoSave();
      }

      // Close color pickers when clicking elsewhere
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.color-picker')) {
          closeAllColorPickers();
        }
      });

      function updateTaskName(index, name) {
        tasks[index].name = name;
        autoSave();
      }

      function updateTaskLabel(index, label) {
        tasks[index].label = label;
        autoSave();
      }

      function deleteRow(index) {
        tasks.splice(index, 1);
        renderGantt();
        autoSave();
      }

      // Global functions for buttons
      window.addTask = function() {
        const newTask = {
          type: "task",
          name: "New Task",
          startWeek: 0,
          durationWeeks: 4,
          class: "foundation",
          label: "New Task"
        };
        tasks.push(newTask);
        renderGantt();
        autoSave();
      }

      window.addPhase = function() {
        const newPhase = {
          type: "phase",
          name: "NEW PHASE",
          startWeek: 0,
          durationWeeks: 8,
          class: "foundation"
        };
        tasks.push(newPhase);
        renderGantt();
        autoSave();
      }

      window.resetChart = function() {
        if (confirm('This will reset the chart to its original state and clear all saved changes. Continue?')) {
          clearStorage();
          tasks = JSON.parse(JSON.stringify(initialTasks));
          renderGantt();
          autoSave();
        }
      }

      // Initial render
      generateHeaders();
      renderGantt();
    };

    script();
  }, []);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Shift 2.0 - 18 Month Implementation Roadmap</h1>
          <div className="subtitle">Weekly Gantt Chart - From Signal to Action in Real Time</div>
        </div>

        <div className="controls">
          <button className="controlBtn" onClick={() => (window as any).addTask()}>+ Add Task</button>
          <button className="controlBtn" onClick={() => (window as any).addPhase()}>+ Add Phase</button>
          <button className="controlBtn" onClick={() => (window as any).resetChart()}>Reset Chart</button>
        </div>

        <div className="ganttContainer">
          <table id="ganttTable">
            <thead id="ganttHeader">
              {/* Headers will be generated dynamically */}
            </thead>
            <tbody id="ganttBody">
              {/* Tasks will be dynamically added here */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
